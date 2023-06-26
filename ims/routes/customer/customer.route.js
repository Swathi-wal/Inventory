//import express module
const exp = require("express");

//creating express mini router
const customerApp = exp.Router();

//bodyparser
customerApp.use(exp.json())

//import customer middleware
let customerVerifyToken = require("../../middlewares/customer.middleware");
//import handlers
const { createOrderHandler,
    getAllProductsHandler,
    orderDetailsHandler,
    createPaymentHandler,
    getSpecificProductHandler,
    getOrderDetailsHandler,
    ordersOfUserHandler } = require("./customerHandler");

//import validators
const { validateOrderSchema,validateOrderId,validateProductId } = require("../../middlewares/validators/customer.validator");

//route for order creation by customer
customerApp.post("/customer/create-order", customerVerifyToken, createOrderHandler)

//route to create shipment details
customerApp.post("/customer/order-details", customerVerifyToken, validateOrderSchema, orderDetailsHandler)

//route to create payment 
customerApp.post("/customer/create-payment/orderId/:orderId", customerVerifyToken,validateOrderId, createPaymentHandler)

//route to get all products
customerApp.get("/customer/getproducts", getAllProductsHandler);

//route to get specific product details
customerApp.get("/customer/get-specific-product/productId/:productId",validateProductId, getSpecificProductHandler)

//customer can get all his orders
customerApp.get("/customer/get-order-details/orderId/:orderId",customerVerifyToken,validateOrderId, getOrderDetailsHandler)

//userorders
customerApp.get("/customer/get-order-details/userId/:userId",ordersOfUserHandler)
//export customer application
module.exports = customerApp;
