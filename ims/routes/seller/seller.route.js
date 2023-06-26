//import express module
const exp = require("express");

//creating express mini router
const sellerApp = exp.Router();

//bodyparser
sellerApp.use(exp.json())

//import sellerverifytoken middleware
let sellerVerifyToken = require('../../middlewares/seller.middleware');

//import seller related validators
const {validateProduct,validateProductId,validateSellerId,validateId}=require("../../middlewares/validators/seller.validator")

//import product related handlers

const {createProductHandler,updateProductHandler,getAllProductsHandler,getProductsByIdHandler,deleteProductHandler}=require("../seller/sellerHandler")
//route to create product by seller
sellerApp.post("/seller/create-product", sellerVerifyToken,validateProduct, createProductHandler);

//route to update product details
sellerApp.put('/seller/update-product/productId/:productId',sellerVerifyToken,validateProduct,updateProductHandler);

// //route to delete product by id
sellerApp.delete("/seller/delete-product-by-id/productId/:productId",validateProductId,sellerVerifyToken,deleteProductHandler)

// //route to get all products
sellerApp.get("/seller/getproducts/sellerId/:sellerId",validateSellerId,sellerVerifyToken,getAllProductsHandler)

//route to get specific product
sellerApp.get("/seller/get-products-by-id/sellerId/:sellerId/productId/:productId",validateId,sellerVerifyToken,getProductsByIdHandler)


module.exports = sellerApp