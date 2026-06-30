"use strict";

var _require = require("../constant"),
  ResponseCode = _require.ResponseCode;
var authorizeRoles = function authorizeRoles() {
  for (var _len = arguments.length, roleIds = new Array(_len), _key = 0; _key < _len; _key++) {
    roleIds[_key] = arguments[_key];
  }
  return function (req, res, next) {
    if (!req.user || !roleIds.includes(Number(req.user.role_id))) {
      return res.status(403).json({
        code: ResponseCode.AUTHORIZATION_ERROR,
        message: "Forbidden. You do not have permission to access this resource."
      });
    }
    next();
  };
};
module.exports = authorizeRoles;