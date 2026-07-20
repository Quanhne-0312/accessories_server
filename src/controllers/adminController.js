import adminService from "../services/adminService";

let adminLogin = async (req, res) => {
    let phoneNumber = req.body.username || req.body.phoneNumber || req.body.email;
    let password = req.body.password;

    if (!phoneNumber || !password) {
        return res.status(400).json({
            code: 4,
            message: "missing parameter(s)",
        });
    }

    let data = await adminService.handleAdminLogin(phoneNumber, password);

    return res.status(200).json({
        code: data.code,
        message: data.message,
        result: data.result ? data.result : {},
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    });
};

export default {
    adminLogin,
};
