import userAuthService from "./userAuthService";

let handleAdminLogin = async (username, password) => {
    return userAuthService.handleLogin(username, password);
};

module.exports = {
    handleAdminLogin,
};
