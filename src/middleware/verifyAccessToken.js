const jwt = require("jsonwebtoken");
const { ResponseCode } = require("../constant");
const db = require("../models");

const verifyAccessToken = async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({
            code: ResponseCode.AUTHORIZATION_ERROR,
            message: "Access denied. No token provided.",
        });
    }

    const [scheme, token] = authorizationHeader.split(" ");
    if (scheme !== "Bearer" || !token) {
        return res.status(401).json({
            code: ResponseCode.AUTHORIZATION_ERROR,
            message: "Access denied. No token provided.",
        });
    }

    try {
        const data = jwt.verify(token, process.env.NODE_ACCESS_TOKEN_SECRET_KEY);
        const user = await db.User.findOne({
            attributes: ["phone_number", "email", "role_id"],
            where: {
                phone_number: data?.phone_number,
            },
            raw: true,
        });

        if (!user || Number(user.role_id) !== Number(data.role_id)) {
            return res.status(401).json({
                code: ResponseCode.AUTHORIZATION_ERROR,
                message: "Your account or permissions changed. Please sign in again.",
            });
        }

        req.user = {
            ...data,
            email: user.email,
            phone_number: user.phone_number,
            role_id: user.role_id,
        };
        return next();
    } catch (error) {
        return res.status(401).json({
            code: ResponseCode.AUTHORIZATION_ERROR,
            message: "Forbidden. Invalid access token.",
        });
    }
};
module.exports = verifyAccessToken;
