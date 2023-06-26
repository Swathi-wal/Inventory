//import express 
const router = require("express")();

//import userapp
const userApp = require("../routes/user/user.route")

//import sellerApp
const sellerApp = require("../routes/seller/seller.route")

//import customerApp
const customerApp=require("../routes/customer/customer.route")

//import adminApp
const adminApp=require("../routes/admin/admin.route")

//middlewares for route
router.use("/", userApp)
router.use("/",sellerApp)
router.use("/",customerApp)
router.use("/",adminApp)

module.exports = router;
