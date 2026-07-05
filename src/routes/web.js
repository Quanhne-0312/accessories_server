import express from "express";
import userController from "../controllers/userController";
import productController from "../controllers/productController";
import postController from "../controllers/postController";
import homeController from "../controllers/homeController";
import adminController from "../controllers/adminController";
import authController from "../controllers/authController";
import customerController from "../controllers/customerController";
import orderController from "../controllers/orderController";
import verifyAccessToken from "../middleware/verifyAccessToken";
import authorizeRoles from "../middleware/authorizeRoles";
import deliveryAddressController from "../controllers/deliveryAddressController";
import verifyRefreshToken from "../middleware/verifyRefreshToken";

let router = express.Router();
const ADMINISTRATOR = 1;
const EMPLOYEE = 2;
const MANAGER = 4;
const staffOnly = authorizeRoles(ADMINISTRATOR, EMPLOYEE, MANAGER);
const managerOnly = authorizeRoles(ADMINISTRATOR, MANAGER);

let initRoutes = (app) => {
    router.get("/", homeController.getHomepage);

    /** ADMIN */

    router.post("/api/admin/login", adminController.adminLogin);

    /** AUTH */

    router.post("/api/auth/user/login", authController.userLogin);
    router.post("/api/auth/user/logout", authController.userLogout);
    router.post("/api/auth/user/refresh", verifyRefreshToken, authController.userRefresh);
    router.put("/api/auth/user/update-profile", verifyAccessToken, authController.updateProfile);

    router.post("/api/auth/customer/login", authController.customerLogin);
    router.post("/api/auth/customer/logout", authController.customerLogout);
    router.post("/api/auth/customer/register", authController.customerRegister);
    router.post("/api/auth/customer/refresh", verifyRefreshToken, authController.customerRefreshTokens);
    router.put("/api/auth/customer/update-profile", verifyAccessToken, authController.customerUpdateProfile);
    router.post("/api/auth/customer/change-password", verifyAccessToken, authController.changeCustomerPassword);

    /** USER */

    router.get("/api/role/get", verifyAccessToken, managerOnly, userController.getRoles);
    router.get("/api/user/count", verifyAccessToken, managerOnly, userController.countUsers);
    router.get("/api/user/get", verifyAccessToken, managerOnly, userController.getUser);
    router.post("/api/user/create", verifyAccessToken, managerOnly, userController.createUser);
    router.put("/api/user/update", verifyAccessToken, managerOnly, userController.updateUser);
    router.delete("/api/user/delete", verifyAccessToken, managerOnly, userController.deleteUser);

    /** PRODUCTS */

    router.get("/api/category/get", productController.getCategories);
    router.get("/api/material/get", productController.getMaterials);
    router.get("/api/color/get", productController.getColors);
    router.post("/api/catalog-option/create", verifyAccessToken, staffOnly, productController.createCatalogOption);
    router.put("/api/catalog-option/update", verifyAccessToken, staffOnly, productController.updateCatalogOption);
    router.delete("/api/catalog-option/delete", verifyAccessToken, staffOnly, productController.deleteCatalogOption);
    router.get("/api/product/count", productController.countProducts);
    router.get("/api/product/get", productController.getProduct);
    router.get("/api/product/search", productController.searchProduct);
    router.post("/api/product/create", verifyAccessToken, staffOnly, productController.createProduct);
    router.put("/api/product/update", verifyAccessToken, staffOnly, productController.updateProduct);
    router.delete("/api/product/delete", verifyAccessToken, staffOnly, productController.deleteProduct);

    /** ORDER */

    router.get("/api/payment-method/get", orderController.getPaymentMethods);
    router.get("/api/status/get", verifyAccessToken, staffOnly, orderController.getOrderStatuses);
    router.get("/api/order/count", verifyAccessToken, staffOnly, orderController.countOrders);
    router.get("/api/order/get", orderController.getOrder);
    router.post("/api/order/checkout", orderController.createOrder);
    router.post("/api/order/customer-cancel", verifyAccessToken, orderController.customerCancelOrder);

    router.get("/api/auth/order/get", verifyAccessToken, staffOnly, orderController.getAllOrder);
    router.post("/api/order/create", verifyAccessToken, staffOnly, orderController.createOrder);
    router.put("/api/order/update", verifyAccessToken, staffOnly, orderController.updateOrder);
    router.delete("/api/order/delete", verifyAccessToken, staffOnly, orderController.deleteOrder);
    router.post("/api/order/confirm", verifyAccessToken, staffOnly, orderController.confirmOrder);
    router.post("/api/order/delivery", verifyAccessToken, staffOnly, orderController.deliveryOrder);
    router.post("/api/order/finished", verifyAccessToken, staffOnly, orderController.finishedOrder);
    router.post("/api/order/cancel", verifyAccessToken, staffOnly, orderController.cancelOrder);

    /** CUSTOMER */

    router.get("/api/customer/get", verifyAccessToken, staffOnly, customerController.getCustomer);
    router.post("/api/customer/create", verifyAccessToken, staffOnly, customerController.createCustomer);
    router.put("/api/customer/update", verifyAccessToken, staffOnly, customerController.updateCustomer);
    router.delete("/api/customer/delete", verifyAccessToken, staffOnly, customerController.deleteCustomer);

    /** DELIVERY ADDRESS */

    router.get("/api/address/get", verifyAccessToken, deliveryAddressController.getDeliveryAddress);
    router.post("/api/address/create", verifyAccessToken, deliveryAddressController.createDeliveryAddress);
    router.put("/api/address/update", verifyAccessToken, deliveryAddressController.updateDeliveryAddress);
    router.delete("/api/address/delete", verifyAccessToken, deliveryAddressController.deleteDeliveryAddress);

    /** IMAGES */
    router.post("/api/image/rollback", productController.rollbackImages);

    /** BLOG */

    router.get("/api/posts/get", postController.getPost);
    router.post("/api/posts/create", verifyAccessToken, staffOnly, postController.createPost);
    router.put("/api/posts/update", verifyAccessToken, staffOnly, postController.updatePost);
    router.delete("/api/posts/delete", verifyAccessToken, staffOnly, postController.deletePost);

    /** APPLY ROUTER */

    return app.use("/", router);
};

module.exports = initRoutes;
