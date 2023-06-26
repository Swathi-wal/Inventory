//import express module
const exp=require("express");

//creating express mini router
const adminApp=exp.Router();

//bodyparser
adminApp.use(exp.json())

//import admin middleware
let adminVerifyToken=require("../../middlewares/admin.middleware");
const { totalStatisticsHandler ,supplierDetailsHandler,sellerDetailsHandler,customerDetailsHandler
} = require("./adminHandler");

//import admin controller
//let {totalStatistics,supplierDetails,sellerDetails,customerDetails}=require("../../controllers/admin.controller")

//route to get totalproducts,totalorder,totalcustomers
adminApp.get("/admin/total-statistics",adminVerifyToken,totalStatisticsHandler)

//admin can get all supplier details
adminApp.get("/admin/supplier-details",adminVerifyToken,supplierDetailsHandler)

// //admin can get all seller details
adminApp.get("/admin/seller-details",adminVerifyToken,sellerDetailsHandler)

// //admin can get all customer details
adminApp.get("/admin/customer-details",adminVerifyToken,customerDetailsHandler)


//default exports
module.exports=adminApp
