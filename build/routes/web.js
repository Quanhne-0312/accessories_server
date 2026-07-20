"use strict";

var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _productController = _interopRequireDefault(require("../controllers/productController"));
var _postController = _interopRequireDefault(require("../controllers/postController"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _adminController = _interopRequireDefault(require("../controllers/adminController"));
var _authController = _interopRequireDefault(require("../controllers/authController"));
var _customerController = _interopRequireDefault(require("../controllers/customerController"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
var _verifyAccessToken = _interopRequireDefault(require("../middleware/verifyAccessToken"));
var _authorizeRoles = _interopRequireDefault(require("../middleware/authorizeRoles"));
var _deliveryAddressController = _interopRequireDefault(require("../controllers/deliveryAddressController"));
var _verifyRefreshToken = _interopRequireDefault(require("../middleware/verifyRefreshToken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
var router = _express["default"].Router();
var asyncHandler = function asyncHandler(handler) {
  return function (req, res, next) {
    try {
      return Promise.resolve(handler(req, res, next))["catch"](next);
    } catch (error) {
      return next(error);
    }
  };
};
var _loop = function _loop() {
  var method = _arr[_i];
  var registerRoute = router[method].bind(router);
  router[method] = function (path) {
    for (var _len = arguments.length, handlers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      handlers[_key - 1] = arguments[_key];
    }
    return registerRoute.apply(void 0, [path].concat(_toConsumableArray(handlers.map(asyncHandler))));
  };
};
for (var _i = 0, _arr = ["get", "post", "put", "delete"]; _i < _arr.length; _i++) {
  _loop();
}
var ADMINISTRATOR = 1;
var EMPLOYEE = 2;
var MANAGER = 4;
var CUSTOMER = 3;
var staffOnly = (0, _authorizeRoles["default"])(ADMINISTRATOR, EMPLOYEE, MANAGER);
var managerOnly = (0, _authorizeRoles["default"])(ADMINISTRATOR, MANAGER);
var customerOnly = (0, _authorizeRoles["default"])(CUSTOMER);
var initRoutes = function initRoutes(app) {
  router.get("/", _homeController["default"].getHomepage);

  /** ADMIN */

  router.post("/api/admin/login", _adminController["default"].adminLogin);

  /** AUTH */

  router.post("/api/auth/user/login", _authController["default"].userLogin);
  router.post("/api/auth/user/logout", _verifyAccessToken["default"], staffOnly, _authController["default"].userLogout);
  router.post("/api/auth/user/refresh", _verifyRefreshToken["default"], _authController["default"].userRefresh);
  router.put("/api/auth/user/update-profile", _verifyAccessToken["default"], staffOnly, _authController["default"].updateProfile);
  router.post("/api/auth/customer/login", _authController["default"].customerLogin);
  router.post("/api/auth/customer/logout", _verifyAccessToken["default"], customerOnly, _authController["default"].customerLogout);
  router.post("/api/auth/customer/register", _authController["default"].customerRegister);
  router.post("/api/auth/customer/refresh", _verifyRefreshToken["default"], _authController["default"].customerRefreshTokens);
  router.put("/api/auth/customer/update-profile", _verifyAccessToken["default"], customerOnly, _authController["default"].customerUpdateProfile);
  router.post("/api/auth/customer/change-password", _verifyAccessToken["default"], customerOnly, _authController["default"].changeCustomerPassword);

  /** USER */

  router.get("/api/role/get", _verifyAccessToken["default"], managerOnly, _userController["default"].getRoles);
  router.get("/api/user/count", _verifyAccessToken["default"], managerOnly, _userController["default"].countUsers);
  router.get("/api/user/get", _verifyAccessToken["default"], managerOnly, _userController["default"].getUser);
  router.post("/api/user/create", _verifyAccessToken["default"], managerOnly, _userController["default"].createUser);
  router.put("/api/user/update", _verifyAccessToken["default"], managerOnly, _userController["default"].updateUser);
  router["delete"]("/api/user/delete", _verifyAccessToken["default"], managerOnly, _userController["default"].deleteUser);

  /** PRODUCTS */

  router.get("/api/category/get", _productController["default"].getCategories);
  router.get("/api/material/get", _productController["default"].getMaterials);
  router.get("/api/color/get", _productController["default"].getColors);
  router.post("/api/catalog-option/create", _verifyAccessToken["default"], staffOnly, _productController["default"].createCatalogOption);
  router.put("/api/catalog-option/update", _verifyAccessToken["default"], staffOnly, _productController["default"].updateCatalogOption);
  router["delete"]("/api/catalog-option/delete", _verifyAccessToken["default"], staffOnly, _productController["default"].deleteCatalogOption);
  router.get("/api/product/count", _productController["default"].countProducts);
  router.get("/api/product/get", _productController["default"].getProduct);
  router.get("/api/product/search", _productController["default"].searchProduct);
  router.post("/api/product/create", _verifyAccessToken["default"], staffOnly, _productController["default"].createProduct);
  router.put("/api/product/update", _verifyAccessToken["default"], staffOnly, _productController["default"].updateProduct);
  router["delete"]("/api/product/delete", _verifyAccessToken["default"], staffOnly, _productController["default"].deleteProduct);

  /** ORDER */

  router.get("/api/payment-method/get", _orderController["default"].getPaymentMethods);
  router.get("/api/status/get", _verifyAccessToken["default"], staffOnly, _orderController["default"].getOrderStatuses);
  router.get("/api/order/count", _verifyAccessToken["default"], staffOnly, _orderController["default"].countOrders);
  router.get("/api/order/get", _verifyAccessToken["default"], _orderController["default"].getOrder);
  router.post("/api/order/checkout", _verifyAccessToken["default"], customerOnly, _orderController["default"].createOrder);
  router.post("/api/order/customer-cancel", _verifyAccessToken["default"], customerOnly, _orderController["default"].customerCancelOrder);
  router.get("/api/auth/order/get", _verifyAccessToken["default"], staffOnly, _orderController["default"].getAllOrder);
  router.post("/api/order/create", _verifyAccessToken["default"], staffOnly, _orderController["default"].createOrder);
  router.put("/api/order/update", _verifyAccessToken["default"], staffOnly, _orderController["default"].updateOrder);
  router["delete"]("/api/order/delete", _verifyAccessToken["default"], staffOnly, _orderController["default"].deleteOrder);
  router.post("/api/order/confirm", _verifyAccessToken["default"], staffOnly, _orderController["default"].confirmOrder);
  router.post("/api/order/delivery", _verifyAccessToken["default"], staffOnly, _orderController["default"].deliveryOrder);
  router.post("/api/order/finished", _verifyAccessToken["default"], staffOnly, _orderController["default"].finishedOrder);
  router.post("/api/order/cancel", _verifyAccessToken["default"], staffOnly, _orderController["default"].cancelOrder);

  /** CUSTOMER */

  router.get("/api/customer/get", _verifyAccessToken["default"], staffOnly, _customerController["default"].getCustomer);
  router.post("/api/customer/create", _verifyAccessToken["default"], staffOnly, _customerController["default"].createCustomer);
  router.put("/api/customer/update", _verifyAccessToken["default"], staffOnly, _customerController["default"].updateCustomer);
  router["delete"]("/api/customer/delete", _verifyAccessToken["default"], staffOnly, _customerController["default"].deleteCustomer);

  /** DELIVERY ADDRESS */

  router.get("/api/address/get", _verifyAccessToken["default"], _deliveryAddressController["default"].getDeliveryAddress);
  router.post("/api/address/create", _verifyAccessToken["default"], _deliveryAddressController["default"].createDeliveryAddress);
  router.put("/api/address/update", _verifyAccessToken["default"], _deliveryAddressController["default"].updateDeliveryAddress);
  router["delete"]("/api/address/delete", _verifyAccessToken["default"], _deliveryAddressController["default"].deleteDeliveryAddress);

  /** IMAGES */
  router.post("/api/image/rollback", _verifyAccessToken["default"], _productController["default"].rollbackImages);

  /** BLOG */

  router.get("/api/posts/get", _postController["default"].getPost);
  router.post("/api/posts/create", _verifyAccessToken["default"], staffOnly, _postController["default"].createPost);
  router.put("/api/posts/update", _verifyAccessToken["default"], staffOnly, _postController["default"].updatePost);
  router["delete"]("/api/posts/delete", _verifyAccessToken["default"], staffOnly, _postController["default"].deletePost);

  /** APPLY ROUTER */

  app.use("/", router);
  app.use(function (error, req, res, next) {
    console.error("Unhandled request error:", error);
    if (res.headersSent) {
      return next(error);
    }
    var requestedStatus = Number(error.status || error.statusCode);
    var status = requestedStatus >= 400 && requestedStatus < 500 ? requestedStatus : 500;
    return res.status(status).json({
      code: status === 400 ? "VALIDATION_ERROR" : "INTERNAL_SERVER_ERROR",
      message: status === 400 ? "Invalid request body." : "An unexpected server error occurred."
    });
  });
  return app;
};
module.exports = initRoutes;