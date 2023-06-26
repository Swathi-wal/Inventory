//import express module
const exp=require("express");

//creating express mini router
const userApp=exp.Router();

//bodyparser
userApp.use(exp.json())

//import joi
//var Joi=require("joi")

//import register handler

const {registerHandler,loginHandler,getUserDetailsWithAddressHandler}=require("./userHandler");

//import user validators 

const { validateRegistration,validateLogin,validateUserId } = require("../../middlewares/validators/user.validator");



//route to create user
userApp.post("/register-user",validateRegistration,registerHandler)

//route for login
userApp.post("/user/login",validateLogin,loginHandler)


//route to get user address
userApp.get("/user/user-address/userId/:userId",validateUserId,getUserDetailsWithAddressHandler)

//export userApp
module.exports=userApp