import cartService from "../services/cartService";
import { ResponseCode } from "../constant";

let getCart = async (req, res) => {
    let userId = req.query.user_id || req.query.userId || req.query["customer-id"] || req.query.customerId;

    if (!userId) {
        return res.status(400).json({
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing infomation.",
        });
    }

    let data = await cartService.handleGetCart(userId);

    return res.status(200).json(data);
};

let updateCart = async (req, res) => {
    let item = {};
    item.userId = req.body.user_id || req.body.userId || req.body.customerId;
    item.productId = req.body.productId;
    item.quantity = req.body.quantity;

    if (!item.userId || !item.productId || item.quantity === undefined) {
        return res.status(400).json({
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing infomation.",
        });
    }

    let data = await cartService.handleUpdateCart(item);

    return res.status(data.code === ResponseCode.SUCCESS ? 200 : 400).json(data);
};

export default {
    getCart,
    updateCart,
};
