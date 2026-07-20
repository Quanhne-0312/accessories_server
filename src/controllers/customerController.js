import { ResponseCode } from "../constant";

const notImplemented = (res) =>
    res.status(501).json({
        code: ResponseCode.NOT_IMPLEMENTED,
        message: "Legacy customer CRUD is disabled. Use the user API with the customer role instead.",
    });

const getCustomer = async (req, res) => notImplemented(res);
const createCustomer = async (req, res) => notImplemented(res);
const updateCustomer = async (req, res) => notImplemented(res);
const updateCustomerAddress = async (req, res) => notImplemented(res);
const deleteCustomer = async (req, res) => notImplemented(res);

export default {
    getCustomer,
    createCustomer,
    updateCustomer,
    updateCustomerAddress,
    deleteCustomer,
};
