import { ResponseCode } from "../constant/index.js";
import orderService from "../services/orderService.js";

const STAFF_ROLE_IDS = new Set([1, 2, 4]);

const isStaffRequest = (req) => STAFF_ROLE_IDS.has(Number(req.user?.role_id));

const authorizationError = (res, message = "You are not allowed to access these orders.") =>
    res.status(403).json({
        code: ResponseCode.AUTHORIZATION_ERROR,
        message,
    });

const getPaymentMethods = async (req, res) => {
    const data = await orderService.handleGetPaymentMethods();
    return res.status(200).json(data);
};

const getOrderStatuses = async (req, res) => {
    const data = await orderService.handleGetOrderStatuses();
    return res.status(200).json(data);
};

const countOrders = async (req, res) => {
    const data = await orderService.handleCountOrders();
    return res.status(200).json(data);
};

const getOrder = async (req, res) => {
    const { order_uuid, order_id, encoded_uuids, phone_number } = req.query;
    const requestedOrderUuid = order_uuid || order_id;
    const authenticatedPhoneNumber = req.user?.phone_number;
    const staffRequest = isStaffRequest(req);

    if (!staffRequest && Number(req.user?.role_id) !== 3) {
        return authorizationError(res);
    }

    if (requestedOrderUuid) {
        const data = await orderService.handleGetOneOrderByUuid(requestedOrderUuid);
        if (
            data.code === ResponseCode.SUCCESS &&
            !staffRequest &&
            data.result?.customer_phone_number !== authenticatedPhoneNumber
        ) {
            return authorizationError(res);
        }

        return res.status(200).json(data);
    }

    if (Object.prototype.hasOwnProperty.call(req.query, "encoded_uuids")) {
        if (!encoded_uuids) {
            return res.status(200).json({
                code: ResponseCode.SUCCESS,
                message: "Orders not found.",
                result: [],
            });
        }

        let requestedOrderUuids;
        try {
            requestedOrderUuids = decodeURIComponent(encoded_uuids)
                .split(",")
                .map((value) => value.trim())
                .filter(Boolean);
        } catch (error) {
            return res.status(400).json({
                code: ResponseCode.VALIDATION_ERROR,
                message: "Invalid order identifiers.",
            });
        }

        if (requestedOrderUuids.length === 0 || requestedOrderUuids.length > 50) {
            return res.status(400).json({
                code: ResponseCode.VALIDATION_ERROR,
                message: "Between 1 and 50 order identifiers are required.",
            });
        }

        const data = await orderService.handleGetOrdersByUuids(encoded_uuids);
        if (data.code === ResponseCode.SUCCESS && !staffRequest) {
            data.result = (data.result || []).filter(
                (order) => order.customer_phone_number === authenticatedPhoneNumber,
            );
        }

        return res.status(200).json(data);
    }

    if (phone_number) {
        if (!staffRequest && phone_number !== authenticatedPhoneNumber) {
            return authorizationError(res);
        }

        const data = await orderService.handleGetOrdersByUserPhoneNumber(
            staffRequest ? phone_number : authenticatedPhoneNumber,
        );
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s).",
    });
};

const getAllOrder = async (req, res) => {
    // const authorizationHeader = req.headers["authorization"];
    // const token = authorizationHeader.split(" ")[1]; // 'Beaer <Token>'

    // jwt.verify(token, process.env.NODE_ACCESS_TOKEN_SECRET_KEY, (err, data) => {
    //     if (err || data.role_id >= 3) {
    //         return res.status(401).json({
    //             code: ResponseCode.AUTHORIZATION_ERROR,
    //             message: "Forbidden. Access denied.",
    //         });
    //     }
    // });

    // delete req.headers["authorization"];

    const { status_id, status, page, keyword } = req.query;
    const data = await orderService.handleGetAllOrders(status_id || status, page, keyword);
    return res.status(200).json(data);
};

let createOrder = async (req, res) => {
    const { customerPhoneNumber: requestedPhoneNumber, items, note, paymentDetails, paymentMethod, shippingAddress } =
        req.body;
    const staffRequest = isStaffRequest(req);
    const authenticatedCustomerPhoneNumber = Number(req.user?.role_id) === 3 ? req.user?.phone_number : null;

    if (!staffRequest && requestedPhoneNumber && requestedPhoneNumber !== authenticatedCustomerPhoneNumber) {
        return authorizationError(res, "You can only place orders for your own account.");
    }

    const customerPhoneNumber = staffRequest ? requestedPhoneNumber : authenticatedCustomerPhoneNumber;

    if (customerPhoneNumber && items && paymentDetails && paymentMethod && shippingAddress) {
        const data = await orderService.handleCreateOrder({
            customerPhoneNumber,
            items,
            note,
            paymentDetails,
            paymentMethod,
            shippingAddress,
            requireRegisteredCustomer: !staffRequest,
        });
        const status =
            data.code === ResponseCode.SUCCESS
                ? 200
                : data.code === ResponseCode.FILE_NOT_FOUND
                  ? 404
                  : data.code === ResponseCode.AUTHORIZATION_ERROR
                    ? 403
                    : 400;
        return res.status(status).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s).",
    });
};

let updateOrder = async (req, res) => {
    const { order_uuid } = req.body;

    if (order_uuid) {
        const data = await orderService.handleUpdateOrder(req.body, req.user?.phone_number);
        return res.status(200).json(data);
    }

    return res.status(400).json({
        code: ResponseCode.MISSING_PARAMETER,
        message: "Missing parameter(s).",
    });
};

let confirmOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleConfirmOrder(req.body.uuid, req.user?.phone_number);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let deliveryOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleDeliveryOrder(req.body.uuid, req.user?.phone_number);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let finishedOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleFinishedOrder(req.body.uuid, req.user?.phone_number);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let cancelOrder = async (req, res) => {
    if (req.body.uuid) {
        let data = await orderService.handleCancelOrder(req.body.uuid, req.user?.phone_number);

        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

let customerCancelOrder = async (req, res) => {
    try {
        const { order_uuid, uuid } = req.body;
        const data = await orderService.handleCustomerCancelOrder(order_uuid || uuid, req.user?.phone_number);
        return res.status(data.code === ResponseCode.SUCCESS ? 200 : 400).json(data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: ResponseCode.INTERNAL_SERVER_ERROR,
            message: "An error occurred while canceling the order.",
        });
    }
};

let deleteOrder = async (req, res) => {
    if (req.body.id || req.body.uuid || req.body.order_uuid) {
        let data = await orderService.handleDeleteOrder(req.body);
        return res.status(200).json({
            code: data.code,
            message: data.message,
        });
    }
    return res.status(400).json({
        code: 1,
        message: "missing parameter(s)",
    });
};

export default {
    getPaymentMethods,
    getOrderStatuses,
    countOrders,
    getAllOrder,
    getOrder,
    createOrder,
    updateOrder,
    confirmOrder,
    deliveryOrder,
    finishedOrder,
    cancelOrder,
    customerCancelOrder,
    deleteOrder,
};
