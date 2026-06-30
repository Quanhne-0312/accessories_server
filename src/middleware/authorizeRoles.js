const { ResponseCode } = require("../constant");

const authorizeRoles = (...roleIds) => {
    return (req, res, next) => {
        if (!req.user || !roleIds.includes(Number(req.user.role_id))) {
            return res.status(403).json({
                code: ResponseCode.AUTHORIZATION_ERROR,
                message: "Forbidden. You do not have permission to access this resource.",
            });
        }

        next();
    };
};

module.exports = authorizeRoles;
