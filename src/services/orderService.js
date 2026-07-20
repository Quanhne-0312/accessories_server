import db from "../models";
import { OrderStateCode, ResponseCode } from "../constant";
import _ from "lodash";
import { randomUUID } from "crypto";
const { Op } = require("sequelize");
import { rollbackTransaction } from "../utils/transaction";
const sequelize = db.sequelize;

const CHECKOUT_VOUCHERS = {
    NEW10: { percent: 10, minSubtotal: 0 },
    YAY15: { percent: 15, minSubtotal: 500000 },
    WOW20: { percent: 20, minSubtotal: 1000000 },
};

const ORDER_TRANSITIONS = new Map([
    [OrderStateCode.PROCESSED, new Set([OrderStateCode.CONFIRMED, OrderStateCode.CANCELED])],
    [OrderStateCode.CONFIRMED, new Set([OrderStateCode.ON_SHIPPED, OrderStateCode.CANCELED])],
    [OrderStateCode.ON_SHIPPED, new Set([OrderStateCode.FINISHED])],
    [OrderStateCode.FINISHED, new Set()],
    [OrderStateCode.CANCELED, new Set()],
]);

const canTransitionOrder = (currentStatusId, nextStatusId) =>
    ORDER_TRANSITIONS.get(Number(currentStatusId))?.has(Number(nextStatusId)) === true;

class CheckoutValidationError extends Error {
    constructor(message, code = ResponseCode.VALIDATION_ERROR) {
        super(message);
        this.name = "CheckoutValidationError";
        this.responseCode = code;
    }
}

const normalizeCheckoutItems = (items) => {
    if (!Array.isArray(items) || items.length === 0 || items.length > 100) {
        throw new CheckoutValidationError("The order must contain between 1 and 100 products.");
    }

    const quantitiesByProductId = new Map();

    for (const item of items) {
        const productId = Number(item?.id ?? item?.product_id ?? item?.productId);
        const quantity = Number(item?.quantity);

        if (!Number.isSafeInteger(productId) || productId <= 0) {
            throw new CheckoutValidationError("Invalid product identifier.");
        }

        if (!Number.isSafeInteger(quantity) || quantity <= 0) {
            throw new CheckoutValidationError("Product quantity must be a positive integer.");
        }

        const accumulatedQuantity = (quantitiesByProductId.get(productId) || 0) + quantity;
        if (!Number.isSafeInteger(accumulatedQuantity) || accumulatedQuantity > 1000) {
            throw new CheckoutValidationError("Product quantity exceeds the allowed limit.");
        }

        quantitiesByProductId.set(productId, accumulatedQuantity);
    }

    return [...quantitiesByProductId.entries()].map(([productId, quantity]) => ({ productId, quantity }));
};

const normalizeShippingAddress = (shippingAddress) => {
    const normalized = {
        receiver_name: String(shippingAddress?.receiver_name || "").trim(),
        receiver_phone: String(shippingAddress?.receiver_phone || "").trim(),
        receiver_address: String(shippingAddress?.receiver_address || "").trim(),
    };

    if (!normalized.receiver_name || !normalized.receiver_phone || !normalized.receiver_address) {
        throw new CheckoutValidationError("Shipping address information is incomplete.");
    }

    if (
        normalized.receiver_name.length > 255 ||
        normalized.receiver_phone.length > 30 ||
        normalized.receiver_address.length > 2000
    ) {
        throw new CheckoutValidationError("Shipping address information is too long.");
    }

    return normalized;
};

const calculateCheckoutTotals = (productsById, normalizedItems, paymentDetails = {}) => {
    const subtotal = normalizedItems.reduce((sum, item) => {
        const product = productsById.get(item.productId);
        const price = Number(product?.price);

        if (!Number.isFinite(price) || price < 0) {
            throw new CheckoutValidationError(`Invalid price for product ${item.productId}.`);
        }

        return sum + price * item.quantity;
    }, 0);

    if (!Number.isSafeInteger(subtotal) || subtotal < 0) {
        throw new CheckoutValidationError("The calculated order subtotal is invalid.");
    }

    const voucherCode = String(paymentDetails?.voucher_code || "")
        .trim()
        .toUpperCase();
    const voucher = voucherCode ? CHECKOUT_VOUCHERS[voucherCode] : null;

    if (voucherCode && !voucher) {
        throw new CheckoutValidationError("Invalid voucher code.");
    }

    if (voucher && subtotal < voucher.minSubtotal) {
        throw new CheckoutValidationError("The order does not meet the voucher minimum subtotal.");
    }

    const discount = voucher ? Math.floor((subtotal * voucher.percent) / 100) : 0;
    const shippingFee = 0;

    return {
        subtotal,
        discount,
        shipping_fee: shippingFee,
        total: subtotal - discount + shippingFee,
    };
};

const restoreOrderInventory = async (order, transaction) => {
    if (!order.inventory_reserved) {
        return false;
    }

    const orderDetails = await db.OrderDetail.findAll({
        attributes: ["product_id", "quantity"],
        where: { order_uuid: order.order_uuid },
        transaction,
        lock: transaction.LOCK.UPDATE,
    });
    const quantitiesByProductId = new Map();

    for (const detail of orderDetails) {
        const productId = Number(detail.product_id);
        const quantity = Number(detail.quantity);

        if (!Number.isSafeInteger(productId) || productId <= 0 || !Number.isSafeInteger(quantity) || quantity <= 0) {
            continue;
        }

        quantitiesByProductId.set(productId, (quantitiesByProductId.get(productId) || 0) + quantity);
    }

    const productIds = [...quantitiesByProductId.keys()].sort((left, right) => left - right);
    const products = productIds.length
        ? await db.Product.findAll({
              where: { id: productIds },
              order: [["id", "ASC"]],
              transaction,
              lock: transaction.LOCK.UPDATE,
          })
        : [];

    for (const product of products) {
        const quantityToRestore = quantitiesByProductId.get(Number(product.id));

        await db.Product.update(
            {
                quantity: Number(product.quantity || 0) + quantityToRestore,
                sold: Math.max(Number(product.sold || 0) - quantityToRestore, 0),
            },
            {
                where: { id: product.id },
                transaction,
            },
        );
    }

    const [updatedRows] = await db.Order.update(
        { inventory_reserved: false },
        {
            where: {
                id: order.id,
                inventory_reserved: true,
            },
            transaction,
        },
    );

    if (updatedRows !== 1) {
        throw new Error("Order inventory reservation changed while restoring stock.");
    }

    return true;
};

const handleGetPaymentMethods = async () => {
    try {
        const paymentMethods = await db.PaymentMethod.findAll();
        if (paymentMethods) {
            return {
                code: ResponseCode.SUCCESS,
                message: "get payment methods successfully",
                result: paymentMethods,
            };
        }
        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: "get payment methods failure",
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "Error occurs, check again!",
        };
    }
};

const handleGetOrderStatuses = async () => {
    try {
        const statuses = await db.Status.findAll({
            order: [["id", "ASC"]],
        });

        return {
            code: ResponseCode.SUCCESS,
            message: "Retrieved order statuses successfully",
            result: statuses,
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving order statuses.",
        };
    }
};

const handleCountOrders = async () => {
    try {
        const [statuses, orders] = await Promise.all([
            db.Status.findAll({
                order: [["id", "ASC"]],
                raw: true,
            }),
            db.Order.findAll({
                attributes: ["status_id"],
                raw: true,
            }),
        ]);

        const result = statuses.map((status) => ({
            ...status,
            slug: status.code,
            order_count: orders.filter((order) => Number(order.status_id) === Number(status.id)).length,
        }));

        return {
            code: ResponseCode.SUCCESS,
            message: "Retrieved orders count successfully",
            result,
        };
    } catch (error) {
        console.log(error);
        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while counting orders.",
        };
    }
};

const handleGetAllOrders = async (status_id, page, keyword) => {
    const currentPage = page && !_.isNaN(page) ? page : 1;
    try {
        const normalizedKeyword = `${keyword || ""}`.trim();
        const where = {};

        if (status_id && status_id !== "all") {
            where.status_id = status_id;
        }

        if (normalizedKeyword) {
            const [shippingAddressesMatched, orderDetailsMatched] = await Promise.all([
                db.ShippingAddress.findAll({
                    attributes: ["id"],
                    where: {
                        [Op.or]: [
                            {
                                receiver_address: {
                                    [Op.iLike]: `%${normalizedKeyword}%`,
                                },
                            },
                            {
                                receiver_name: {
                                    [Op.iLike]: `%${normalizedKeyword}%`,
                                },
                            },
                            {
                                receiver_phone: {
                                    [Op.iLike]: `%${normalizedKeyword}%`,
                                },
                            },
                        ],
                    },
                }),
                db.OrderDetail.findAll({
                    attributes: ["order_uuid"],
                    where: {
                        [Op.or]: [
                            {
                                name: {
                                    [Op.iLike]: `%${normalizedKeyword}%`,
                                },
                            },
                            {
                                slug: {
                                    [Op.iLike]: `%${normalizedKeyword}%`,
                                },
                            },
                        ],
                    },
                }),
            ]);

            const matchedShippingAddressIds = shippingAddressesMatched.map((address) => address.id);
            const matchedOrderUuids = orderDetailsMatched.map((detail) => detail.order_uuid);
            const keywordFilter = [
                {
                    order_uuid: {
                        [Op.iLike]: `%${normalizedKeyword}%`,
                    },
                },
                {
                    customer_phone_number: {
                        [Op.iLike]: `%${normalizedKeyword}%`,
                    },
                },
                {
                    note: {
                        [Op.iLike]: `%${normalizedKeyword}%`,
                    },
                },
            ];

            if (!Number.isNaN(Number(normalizedKeyword))) {
                keywordFilter.push({
                    total: Number(normalizedKeyword),
                });
            }

            if (matchedShippingAddressIds.length > 0) {
                keywordFilter.push({
                    shipping_address_id: matchedShippingAddressIds,
                });
            }

            if (matchedOrderUuids.length > 0) {
                keywordFilter.push({
                    order_uuid: matchedOrderUuids,
                });
            }

            where[Op.or] = keywordFilter;
        }

        const { count, rows: orders } = await db.Order.findAndCountAll({
            where,
            order: [["id", "DESC"]],
            limit: 12,
            offset: (currentPage - 1) * 12,
        });

        if (count > 0) {
            const [orderDetails, shippingAddresses, paymentMethods, orderStatuses] = await Promise.all([
                db.OrderDetail.findAll({
                    where: {
                        order_uuid: orders.map((order) => order.order_uuid),
                    },
                }),
                db.ShippingAddress.findAll({
                    where: {
                        id: orders.map((order) => order.shipping_address_id),
                    },
                }),
                db.PaymentMethod.findAll(),
                db.Status.findAll(),
            ]);

            const result = orders.map((order) => {
                const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                const orderStatus = orderStatuses.find((status) => status.id === status_id);
                const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                return {
                    ...rest,
                    status: orderStatus,
                    items: orderDetail,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                };
            });

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved orders successfully`,
                page: currentPage,
                total_pages: Math.ceil(count / 12),
                total_results: count,
                result,
            };
        }

        return {
            code: ResponseCode.SUCCESS,
            message: `Orders not found.`,
            page: currentPage,
            total_pages: 1,
            total_results: 0,
            result: [],
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleGetOneOrderByUuid = async (order_uuid) => {
    try {
        const order = await db.Order.findOne({
            where: {
                order_uuid,
            },
            raw: true,
        });

        if (order) {
            const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

            const [order_status, order_details, shipping_address, payment_method, history] = await Promise.all([
                db.Status.findOne({
                    where: {
                        id: status_id,
                    },
                    raw: true,
                }),
                db.OrderDetail.findAll({
                    where: {
                        order_uuid,
                    },
                    raw: true,
                }),
                db.ShippingAddress.findOne({
                    where: {
                        id: shipping_address_id,
                    },
                    raw: true,
                }),
                db.PaymentMethod.findOne({
                    where: {
                        id: payment_method_id,
                    },
                    raw: true,
                }),
                db.HistoryOrderUpdate.findAll({
                    where: {
                        order_uuid,
                    },
                    order: [["createdAt", "DESC"]],
                    raw: true,
                }),
            ]);

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved order ${order_uuid} successfully`,
                result: {
                    ...rest,
                    status: order_status,
                    items: order_details,
                    shipping_address,
                    payment_method,
                    history,
                },
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Order ${order_uuid} not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the order.",
        };
    }
};

const handleGetOrdersByUuids = async (encodedUuids) => {
    try {
        const decodedUuids = decodeURIComponent(encodedUuids);

        if (_.isEmpty(decodedUuids)) {
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: `Orders not found.`,
            };
        }

        const uuids = decodedUuids.split(",");
        const orders = await db.Order.findAll({
            where: {
                order_uuid: uuids,
            },
        });

        if (orders.length > 0) {
            const [orderDetails, orderStatuses, shippingAddresses, paymentMethods] = await Promise.all([
                db.OrderDetail.findAll({
                    where: {
                        order_uuid: uuids,
                    },
                }),
                db.Status.findAll({
                    where: {
                        id: orders.map((order) => order.status_id),
                    },
                }),
                db.ShippingAddress.findAll({
                    where: {
                        id: orders.map((order) => order.shipping_address_id),
                    },
                }),
                db.PaymentMethod.findAll({
                    where: {
                        id: orders.map((order) => order.payment_method_id),
                    },
                }),
            ]);

            const result = orders.map((order) => {
                const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                const orderStatus = orderStatuses.find((status) => status.id === status_id);
                const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                return {
                    ...rest,
                    status: orderStatus,
                    items: orderDetail,
                    shipping_address: shippingAddress,
                    payment_method: paymentMethod,
                };
            });

            return {
                code: ResponseCode.SUCCESS,
                message: `Retrieved orders successfully`,
                result,
            };
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Orders not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleGetOrdersByUserPhoneNumber = async (phone_number) => {
    try {
        const user = await db.User.findOne({
            where: {
                phone_number,
            },
        });

        if (user) {
            const orders = await db.Order.findAll({
                where: {
                    customer_phone_number: user.phone_number,
                },
            });

            if (orders.length > 0) {
                const [orderDetails, orderStatuses, shippingAddresses, paymentMethods] = await Promise.all([
                    db.OrderDetail.findAll({
                        where: {
                            order_uuid: orders.map((order) => order.order_uuid),
                        },
                    }),
                    db.Status.findAll({
                        where: {
                            id: orders.map((order) => order.status_id),
                        },
                    }),
                    db.ShippingAddress.findAll({
                        where: {
                            id: orders.map((order) => order.shipping_address_id),
                        },
                    }),
                    db.PaymentMethod.findAll({
                        where: {
                            id: orders.map((order) => order.payment_method_id),
                        },
                    }),
                ]);

                const result = orders.map((order) => {
                    const { id, shipping_address_id, payment_method_id, status_id, ...rest } = order;

                    const orderDetail = orderDetails.filter((detail) => detail.order_uuid === order.order_uuid);
                    const orderStatus = orderStatuses.find((status) => status.id === status_id);
                    const shippingAddress = shippingAddresses.find((address) => address.id === shipping_address_id);
                    const paymentMethod = paymentMethods.find((method) => method.id === payment_method_id);

                    return {
                        ...rest,
                        status: orderStatus,
                        items: orderDetail,
                        shipping_address: shippingAddress,
                        payment_method: paymentMethod,
                    };
                });

                return {
                    code: ResponseCode.SUCCESS,
                    message: `Retrieved orders successfully`,
                    result,
                };
            }
        }

        return {
            code: ResponseCode.FILE_NOT_FOUND,
            message: `Orders not found.`,
        };
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while retrieving the orders.",
        };
    }
};

const handleCreateOrder = async (order) => {
    let transaction;

    try {
        const {
            customerPhoneNumber,
            items,
            note,
            paymentDetails,
            paymentMethod,
            shippingAddress,
            requireRegisteredCustomer,
        } = order;
        const normalizedPhoneNumber = String(customerPhoneNumber || "").trim();
        const normalizedItems = normalizeCheckoutItems(items);
        const paymentMethodId = Number(paymentMethod?.id);
        const normalizedShippingAddress = normalizeShippingAddress(shippingAddress);

        if (!normalizedPhoneNumber || normalizedPhoneNumber.length > 30) {
            throw new CheckoutValidationError("Invalid customer phone number.");
        }

        if (!Number.isSafeInteger(paymentMethodId) || paymentMethodId <= 0) {
            throw new CheckoutValidationError("Invalid payment method.");
        }

        transaction = await sequelize.transaction();

        if (requireRegisteredCustomer) {
            const customer = await db.User.findOne({
                attributes: ["id"],
                where: {
                    phone_number: normalizedPhoneNumber,
                    role_id: 3,
                },
                transaction,
            });

            if (!customer) {
                throw new CheckoutValidationError(
                    "The authenticated customer account is no longer available.",
                    ResponseCode.AUTHORIZATION_ERROR,
                );
            }
        }

        const validPaymentMethod = await db.PaymentMethod.findOne({
            attributes: ["id"],
            where: { id: paymentMethodId },
            transaction,
        });

        if (!validPaymentMethod) {
            throw new CheckoutValidationError("Payment method not found.", ResponseCode.FILE_NOT_FOUND);
        }

        const productIds = normalizedItems.map((item) => item.productId);
        const products = await db.Product.findAll({
            where: {
                id: productIds,
            },
            order: [["id", "ASC"]],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        const productsById = new Map(products.map((product) => [Number(product.id), product]));
        if (productsById.size !== productIds.length) {
            throw new CheckoutValidationError("One or more products no longer exist.", ResponseCode.FILE_NOT_FOUND);
        }

        for (const item of normalizedItems) {
            const product = productsById.get(item.productId);
            const availableQuantity = Number(product.quantity);

            if (!Number.isSafeInteger(availableQuantity) || availableQuantity < item.quantity) {
                throw new CheckoutValidationError(`Product ${product.name} does not have enough stock.`);
            }
        }

        const calculatedPaymentDetails = calculateCheckoutTotals(productsById, normalizedItems, paymentDetails);
        const orderUuid = randomUUID();
        // Shipping details are an immutable order snapshot. Never reuse one
        // address row between orders because an admin edit would mutate history.
        const shippingAddressRecord = await db.ShippingAddress.create(normalizedShippingAddress, { transaction });

        await db.Order.create(
            {
                order_uuid: orderUuid,
                customer_phone_number: normalizedPhoneNumber,
                shipping_address_id: shippingAddressRecord.id,
                payment_method_id: paymentMethodId,
                ...calculatedPaymentDetails,
                status_id: 1,
                inventory_reserved: true,
                note: typeof note === "string" ? note.slice(0, 5000) : "",
            },
            { transaction },
        );

        await db.OrderDetail.bulkCreate(
            normalizedItems.map(({ productId, quantity }) => {
                const product = productsById.get(productId);
                return {
                    order_uuid: orderUuid,
                    product_id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: Number(product.price),
                    quantity,
                    feature_image_url: product.feature_image_url,
                };
            }),
            { transaction },
        );

        await db.HistoryOrderUpdate.create(
            {
                order_uuid: orderUuid,
                employee_id: null,
                status_id: 1,
                description: `Customer ${normalizedPhoneNumber} placed the order`,
            },
            { transaction },
        );

        for (const item of normalizedItems) {
            const product = productsById.get(item.productId);
            const [updatedRows] = await db.Product.update(
                {
                    quantity: Number(product.quantity) - item.quantity,
                    sold: Number(product.sold || 0) + item.quantity,
                },
                {
                    where: {
                        id: item.productId,
                        quantity: {
                            [Op.gte]: item.quantity,
                        },
                    },
                    transaction,
                },
            );

            if (updatedRows !== 1) {
                throw new CheckoutValidationError(`Product ${product.name} does not have enough stock.`);
            }
        }

        await transaction.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Create order successfully",
            result: orderUuid,
        };
    } catch (error) {
        await rollbackTransaction(transaction);
        console.log(error);

        return {
            code: error instanceof CheckoutValidationError ? error.responseCode : ResponseCode.DATABASE_ERROR,
            message:
                error instanceof CheckoutValidationError
                    ? error.message
                    : "An error occurred during the transaction.",
        };
    }
};

let handleConfirmOrder;
let handleDeliveryOrder;
let handleFinishedOrder;
let handleCancelOrder;
let handleDeleteOrder;

const getEmployeeIdByPhone = async (phoneNumber, transaction) => {
    if (!phoneNumber) return null;

    const employee = await db.User.findOne({
        attributes: ["id"],
        where: {
            phone_number: phoneNumber,
        },
        transaction,
    });

    return employee?.id || null;
};

const handleUpdateOrder = async (data, employeePhoneNumber) => {
    let t;

    try {
        t = await sequelize.transaction();
        const { order_uuid, status_id, note, payment_method_id, shipping_address } = data;
        const order = await db.Order.findOne({
            where: {
                order_uuid,
            },
            transaction: t,
            lock: t.LOCK.UPDATE,
        });

        if (!order) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Order not found.",
            };
        }

        const orderUpdates = {};
        const hasStatusUpdate = status_id !== undefined && status_id !== null && status_id !== "";
        const nextStatusId = hasStatusUpdate ? Number(status_id) : null;
        const currentStatusId = Number(order.status_id);

        if (hasStatusUpdate && (!Number.isSafeInteger(nextStatusId) || !ORDER_TRANSITIONS.has(nextStatusId))) {
            await t.rollback();
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Invalid order status.",
            };
        }

        if (nextStatusId !== null && nextStatusId !== currentStatusId) {
            if (!canTransitionOrder(currentStatusId, nextStatusId)) {
                await t.rollback();
                return {
                    code: ResponseCode.VALIDATION_ERROR,
                    message: `Order cannot transition from status ${currentStatusId} to ${nextStatusId}.`,
                };
            }

            const status = await db.Status.findOne({
                where: { id: nextStatusId },
                transaction: t,
            });

            if (!status) {
                await t.rollback();
                return {
                    code: ResponseCode.FILE_NOT_FOUND,
                    message: "Order status not found.",
                };
            }

            if (nextStatusId === OrderStateCode.CANCELED) {
                await restoreOrderInventory(order, t);
            }

            orderUpdates.status_id = nextStatusId;
            if (nextStatusId === OrderStateCode.FINISHED) {
                // A finished order consumes the reservation permanently. Stock
                // was already deducted at checkout, so clear the flag without
                // restoring inventory.
                orderUpdates.inventory_reserved = false;
            }
            await db.HistoryOrderUpdate.create(
                {
                    order_uuid,
                    employee_id: await getEmployeeIdByPhone(employeePhoneNumber, t),
                    status_id: nextStatusId,
                    description: `Update order status to ${status.code}`,
                },
                { transaction: t },
            );
        }

        if (note !== undefined) {
            orderUpdates.note = note;
        }

        if (payment_method_id) {
            orderUpdates.payment_method_id = Number(payment_method_id);
        }

        const previousShippingAddressId = order.shipping_address_id;
        if (shipping_address) {
            const shippingAddressSnapshot = await db.ShippingAddress.create(normalizeShippingAddress(shipping_address), {
                transaction: t,
            });
            orderUpdates.shipping_address_id = shippingAddressSnapshot.id;
        }

        if (Object.keys(orderUpdates).length > 0) {
            await db.Order.update(orderUpdates, {
                where: {
                    order_uuid,
                },
                transaction: t,
            });
        }

        if (shipping_address && previousShippingAddressId) {
            const remainingReferences = await db.Order.count({
                where: { shipping_address_id: previousShippingAddressId },
                transaction: t,
            });

            if (remainingReferences === 0) {
                await db.ShippingAddress.destroy({
                    where: { id: previousShippingAddressId },
                    transaction: t,
                });
            }
        }

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update order successfully",
        };
    } catch (error) {
        await rollbackTransaction(t);
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while updating the order.",
        };
    }
};

const handleChangeOrderStatus = async (uuid, statusId, employeePhoneNumber, description) => {
    const data = await handleUpdateOrder(
        {
            order_uuid: uuid,
            status_id: statusId,
        },
        employeePhoneNumber,
    );

    return {
        code: data.code,
        message: data.code === ResponseCode.SUCCESS ? description : data.message,
    };
};

handleConfirmOrder = (uuid, employeePhoneNumber) => {
    return handleChangeOrderStatus(uuid, 2, employeePhoneNumber, "this order has been confirmed");
};

handleDeliveryOrder = (uuid, employeePhoneNumber) => {
    return handleChangeOrderStatus(uuid, 3, employeePhoneNumber, "this order being delivery");
};

handleFinishedOrder = (uuid, employeePhoneNumber) => {
    return handleChangeOrderStatus(uuid, 4, employeePhoneNumber, "delivery success");
};

handleCancelOrder = (uuid, employeePhoneNumber) => {
    return handleChangeOrderStatus(uuid, 5, employeePhoneNumber, "this order has been cancelled");
};

const handleCustomerCancelOrder = async (orderUuid, customerPhoneNumber) => {
    if (!orderUuid || !customerPhoneNumber) {
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing parameter(s).",
        };
    }

    try {
        return await db.sequelize.transaction(async (transaction) => {
            const order = await db.Order.findOne({
                where: {
                    order_uuid: orderUuid,
                    customer_phone_number: customerPhoneNumber,
                },
                transaction,
                lock: transaction.LOCK.UPDATE,
            });

            if (!order) {
                return {
                    code: ResponseCode.FILE_NOT_FOUND,
                    message: "Order not found.",
                };
            }

            const currentStatusId = Number(order.status_id);
            if (currentStatusId === OrderStateCode.CANCELED) {
                return {
                    code: ResponseCode.VALIDATION_ERROR,
                    message: "Order has already been canceled.",
                };
            }

            if (!canTransitionOrder(currentStatusId, OrderStateCode.CANCELED)) {
                return {
                    code: ResponseCode.VALIDATION_ERROR,
                    message: "Only processed or confirmed orders can be canceled.",
                };
            }

            const [updatedRows] = await db.Order.update(
                {
                    status_id: OrderStateCode.CANCELED,
                },
                {
                    where: {
                        id: order.id,
                        status_id: currentStatusId,
                    },
                    transaction,
                },
            );

            if (updatedRows !== 1) {
                throw new Error("Order status changed while canceling.");
            }

            await restoreOrderInventory(order, transaction);

            await db.HistoryOrderUpdate.create(
                {
                    order_uuid: orderUuid,
                    employee_id: null,
                    status_id: OrderStateCode.CANCELED,
                    description: `Customer ${customerPhoneNumber} canceled order`,
                },
                { transaction },
            );

            return {
                code: ResponseCode.SUCCESS,
                message: "Cancel order successfully.",
            };
        });
    } catch (error) {
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while canceling the order.",
        };
    }
};

handleDeleteOrder = async ({ id, uuid, order_uuid }) => {
    const where = order_uuid || uuid ? { order_uuid: order_uuid || uuid } : { id };

    if (!where.id && !where.order_uuid) {
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing order identifier.",
        };
    }

    let t;
    try {
        t = await sequelize.transaction();
        const targetOrder = await db.Order.findOne({
            where,
            transaction: t,
            lock: t.LOCK.UPDATE,
        });

        if (!targetOrder) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "invalid order",
            };
        }

        if (Number(targetOrder.status_id) !== OrderStateCode.CANCELED) {
            await t.rollback();
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Only canceled orders can be deleted.",
            };
        }

        await restoreOrderInventory(targetOrder, t);

        await db.HistoryOrderUpdate.destroy({
            where: { order_uuid: targetOrder.order_uuid },
            transaction: t,
        });
        await db.OrderDetail.destroy({
            where: { order_uuid: targetOrder.order_uuid },
            transaction: t,
        });

        await db.Order.destroy({
            where: { id: targetOrder.id },
            transaction: t,
        });

        if (targetOrder.shipping_address_id) {
            const remainingReferences = await db.Order.count({
                where: { shipping_address_id: targetOrder.shipping_address_id },
                transaction: t,
            });

            if (remainingReferences === 0) {
                await db.ShippingAddress.destroy({
                    where: { id: targetOrder.shipping_address_id },
                    transaction: t,
                });
            }
        }

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete order successfully.",
        };
    } catch (error) {
        await rollbackTransaction(t);
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while deleting the order.",
        };
    }
};

module.exports = {
    handleGetPaymentMethods,
    handleGetOrderStatuses,
    handleCountOrders,
    handleGetAllOrders,
    handleGetOneOrderByUuid,
    handleGetOrdersByUuids,
    handleGetOrdersByUserPhoneNumber,
    handleCreateOrder,
    handleUpdateOrder,
    handleConfirmOrder,
    handleDeliveryOrder,
    handleFinishedOrder,
    handleCancelOrder,
    handleCustomerCancelOrder,
    handleDeleteOrder,
};
