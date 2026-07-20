import { ResponseCode } from "../constant";
import db from "../models";

/** GET DELIVERY ADDRESS */

const handleGetCart = async (userId) => {
    if (!userId) {
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing parameter(s).",
        };
    }

    const cart = await db.Cart.findAll({
        where: { user_id: userId },
        order: [["id", "DESC"]],
    });

    return {
        code: ResponseCode.SUCCESS,
        message: "Get cart items successfully",
        result: cart,
    };
};

/** CREATE NEW DELIVERY ADDRESS */

const handleUpdateCart = async (item) => {
    const userId = Number(item?.userId ?? item?.customerId);
    const productId = Number(item?.productId);
    const quantity = Number(item?.quantity);

    if (!Number.isSafeInteger(userId) || userId <= 0 || !Number.isSafeInteger(productId) || productId <= 0) {
        return {
            code: ResponseCode.MISSING_PARAMETER,
            message: "Missing parameter(s).",
        };
    }

    if (!Number.isSafeInteger(quantity) || quantity < 0) {
        return {
            code: ResponseCode.VALIDATION_ERROR,
            message: "Cart quantity must be a non-negative integer.",
        };
    }

    const where = { user_id: userId, product_id: productId };

    if (quantity === 0) {
        await db.Cart.destroy({ where });
    } else {
        const [cartItem, created] = await db.Cart.findOrCreate({
            where,
            defaults: { ...where, quantity },
        });

        if (!created) {
            await cartItem.update({ quantity });
        }
    }

    return {
        code: ResponseCode.SUCCESS,
        message: "Update cart successfully.",
    };
};

module.exports = {
    handleGetCart,
    handleUpdateCart,
};
