import db from "../models";
import { OrderStateCode, ResponseCode } from "../constant";
import sequelize from "../config/database";
import _ from "lodash";
const { Op } = require("sequelize");

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
    const t = sequelize.transaction();
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
    const t = sequelize.transaction();
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
    const t = sequelize.transaction();
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
    const t = await sequelize.transaction();

    try {
        const thisMoment = new Date();
        const datetimeUuid = thisMoment.valueOf();

        const { customerPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress } = order;

        const [shipping_adddress, created] = await db.ShippingAddress.findOrCreate({
            where: {
                ...shippingAddress,
            },
            defaults: shippingAddress,
            transaction: t,
        });

        const orderDataToInsert = {
            order_uuid: datetimeUuid,
            customer_phone_number: customerPhoneNumber,
            shipping_address_id: shipping_adddress.id,
            payment_method_id: paymentMethod.id,
            ...paymentDetails,
            status_id: 1,
            note,
        };

        const orderItemsToInsert = items.map(({ id, name, slug, price, quantity, feature_image_url }) => ({
            order_uuid: datetimeUuid,
            product_id: id,
            slug,
            name,
            price,
            quantity,
            feature_image_url,
        }));

        const historyDataToInsert = {
            order_uuid: datetimeUuid,
            employee_id: null,
            status_id: 1,
            description: `Khách ${customerPhoneNumber} đặt hàng`,
        };

        await Promise.all([
            db.Order.create(orderDataToInsert, { transaction: t }),
            db.OrderDetail.bulkCreate(orderItemsToInsert, { transaction: t }),
            db.HistoryOrderUpdate.create(historyDataToInsert, { transaction: t }),
        ]);

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Create order successfully",
            result: datetimeUuid,
        };
    } catch (error) {
        await t.rollback();

        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred during the transaction.",
        };
    }
};

let handleConfirmOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code < 1) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 1,
                            description: "Đã xác nhận",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order has been confirmed";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleDeliveryOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code < 2) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 2,
                            description: "Đang giao hàng",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order being delivery";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleFinishedOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code === 2) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 3,
                            description: "Giao hàng thành công",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "delivery success";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleCancelOrder = (uuid) => {
    return new Promise(async (resolve, reject) => {
        let data = {};
        try {
            let targetOrder = await db.Order.findOne({
                where: { orderUuid: uuid },
            });
            if (targetOrder) {
                const thisMoment = new Date();
                const stateArray = JSON.parse(targetOrder.state);
                if (stateArray[stateArray.length - 1].code !== 4) {
                    const newStateArray = [
                        ...stateArray,
                        {
                            code: 4,
                            description: "Đã hủy",
                            time: thisMoment.toISOString(),
                        },
                    ];
                    await db.Order.update(
                        {
                            state: JSON.stringify(newStateArray),
                        },
                        {
                            where: { orderUuid: uuid },
                        },
                    );
                    data.code = 0;
                    data.message = "this order has been cancelled";
                }
            } else {
                data.code = 2;
                data.message = "invalid order";
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
};

let handleDeleteOrder = async (orderRef) => {
    const orderId = typeof orderRef === "object" ? orderRef.id : orderRef;
    const orderUuid = typeof orderRef === "object" ? orderRef.order_uuid || orderRef.uuid : null;
    const where = orderId ? { id: orderId } : { order_uuid: orderUuid };

    if (!where.id && !where.order_uuid) {
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing order identifier.",
        };
    }

    const t = await sequelize.transaction();

    try {
        const targetOrder = await db.Order.findOne({
            where,
            transaction: t,
        });

        if (!targetOrder) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Order not found.",
            };
        }

        await db.OrderDetail.destroy({
            where: { order_uuid: targetOrder.order_uuid },
            transaction: t,
        });

        await db.HistoryOrderUpdate.destroy({
            where: { order_uuid: targetOrder.order_uuid },
            transaction: t,
        });

        await db.Order.destroy({
            where: { id: targetOrder.id },
            transaction: t,
        });

        await t.commit();
        return {
            code: ResponseCode.SUCCESS,
            message: "Delete order successfully.",
        };
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getEmployeeIdByPhone = async (phoneNumber) => {
    if (!phoneNumber) return null;

    const employee = await db.User.findOne({
        attributes: ["id"],
        where: {
            phone_number: phoneNumber,
        },
    });

    return employee?.id || null;
};

const handleUpdateOrder = async (data, employeePhoneNumber) => {
    const t = await sequelize.transaction();

    try {
        const { order_uuid, status_id, note, payment_method_id, shipping_address } = data;
        const order = await db.Order.findOne({
            where: {
                order_uuid,
            },
            transaction: t,
        });

        if (!order) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Order not found.",
            };
        }

        const orderUpdates = {};
        const nextStatusId = status_id ? Number(status_id) : null;

        if (nextStatusId && nextStatusId !== Number(order.status_id)) {
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

            orderUpdates.status_id = nextStatusId;
            await db.HistoryOrderUpdate.create(
                {
                    order_uuid,
                    employee_id: await getEmployeeIdByPhone(employeePhoneNumber),
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

        if (shipping_address) {
            await db.ShippingAddress.update(
                {
                    receiver_name: shipping_address.receiver_name,
                    receiver_phone: shipping_address.receiver_phone,
                    receiver_address: shipping_address.receiver_address,
                },
                {
                    where: {
                        id: order.shipping_address_id,
                    },
                    transaction: t,
                },
            );
        }

        if (Object.keys(orderUpdates).length > 0) {
            await db.Order.update(orderUpdates, {
                where: {
                    order_uuid,
                },
                transaction: t,
            });
        }

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Update order successfully",
        };
    } catch (error) {
        await t.rollback();
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

    const t = await sequelize.transaction();

    try {
        const order = await db.Order.findOne({
            where: {
                order_uuid: orderUuid,
                customer_phone_number: customerPhoneNumber,
            },
            transaction: t,
        });

        if (!order) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "Order not found.",
            };
        }

        const currentStatusId = Number(order.status_id);
        if (currentStatusId === 5) {
            await t.rollback();
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Order has already been canceled.",
            };
        }

        if (currentStatusId >= 3) {
            await t.rollback();
            return {
                code: ResponseCode.VALIDATION_ERROR,
                message: "Only processed or confirmed orders can be canceled by customer.",
            };
        }

        await db.Order.update(
            {
                status_id: 5,
            },
            {
                where: {
                    id: order.id,
                },
                transaction: t,
            },
        );

        await db.HistoryOrderUpdate.create(
            {
                order_uuid: orderUuid,
                employee_id: null,
                status_id: 5,
                description: `Customer ${customerPhoneNumber} canceled order`,
            },
            { transaction: t },
        );

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Cancel order successfully.",
        };
    } catch (error) {
        await t.rollback();
        console.log(error);

        return {
            code: ResponseCode.DATABASE_ERROR,
            message: "An error occurred while canceling the order.",
        };
    }
};

handleDeleteOrder = async ({ id, uuid, order_uuid }) => {
    const t = await sequelize.transaction();
    const where = order_uuid || uuid ? { order_uuid: order_uuid || uuid } : { id };

    if (!where.id && !where.order_uuid) {
        await t.rollback();
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing order identifier.",
        };
    }

    try {
        const targetOrder = await db.Order.findOne({
            where,
            transaction: t,
        });

        if (!targetOrder) {
            await t.rollback();
            return {
                code: ResponseCode.FILE_NOT_FOUND,
                message: "invalid order",
            };
        }

        await Promise.all([
            db.HistoryOrderUpdate.destroy({
                where: { order_uuid: targetOrder.order_uuid },
                transaction: t,
            }),
            db.OrderDetail.destroy({
                where: { order_uuid: targetOrder.order_uuid },
                transaction: t,
            }),
        ]);

        await db.Order.destroy({
            where: { id: targetOrder.id },
            transaction: t,
        });

        await t.commit();

        return {
            code: ResponseCode.SUCCESS,
            message: "Delete order successfully.",
        };
    } catch (error) {
        await t.rollback();
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
