import { ResponseCode } from "../constant";

const notImplemented = (res) =>
    res.status(501).json({
        code: ResponseCode.NOT_IMPLEMENTED,
        message: "Saved delivery addresses are not implemented. Checkout shipping addresses remain available.",
    });

const getDeliveryAddress = async (req, res) => notImplemented(res);
const createDeliveryAddress = async (req, res) => notImplemented(res);
const updateDeliveryAddress = async (req, res) => notImplemented(res);
const deleteDeliveryAddress = async (req, res) => notImplemented(res);

export default {
    getDeliveryAddress,
    createDeliveryAddress,
    updateDeliveryAddress,
    deleteDeliveryAddress,
};
