//importing sequelize from db.config
const sequelize = require("../db/db.config");

//import user model and userorder model 
let User = require("../db/models/user.model")

//import userOrder model
let UserOrders = require("../db/models/userOrder.model")

//import orderDetails model
let OrderDetails = require("../db/models/orderDetails.model")

//import product model
let Product = require("../db/models/product.model")

//import payment model
let Payment = require("../db/models/payment.model")

//creating order by customer
const createOrder = async (req) => {
    console.log("....", req);
    try {
        let totalPrice = req.quantity * req.unitPrice;
        req.totalPrice = totalPrice;
        //create order with given data
        let orderData = await UserOrders.create(req);
        //send successful response like order created
        return { message: "order created", payload: orderData }
    } catch (error) {
        throw error
    }
}
//to get all products details
const getAllProducts = async (req) => {
    const t = await sequelize.transaction()
    try {
        //to get all products using findall method
        let getProducts = await Product.findAll({ transaction: t })
        //if no products exists
        if (getProducts.length === 0) {
            //send response as no products
            return { message: "no products" }
        }
        //if products exists
        else {
            //send success response showing all product details and commit the transaction
            await t.commit()
            return { message: "all products", payload: getProducts }
        }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }
}
const ordersOfUser = async (req) => {
    const t = await sequelize.transaction();

    try {
        let ordersFromDb = await UserOrders.findAll({ where: { userId: req.params.userId } }, { transaction: t })
        console.log("orders..", ordersFromDb)
        let ordersData = ordersFromDb;
        let orders = []
        await Promise.all(
            ordersData.map(async (order, index) => {
                // console.log("productId in order:", order.productId)
                let productDetails = await Product.findOne({ where: { id: order.productId } })
                // console.log("productDetails..", productDetails.dataValues);
                // console.log("OrderDetails..", order.dataValues);


                orders.push({ order: order.dataValues, product: productDetails.dataValues });
                // console.log("orders...", orders);
            })
        )

        //console.log("productId..", orders[0].UserOrders.dataValues.productId)
        // let productDetails=await Product.findOne({where:{id:orders.productId}})
        console.log("....", orders);
        return { message: "userorders", payload: orders }

    } catch (error) {
        //if error
        await t.rollback()
        throw error

    }




}


//creating ordered details
const orderDetail = async (body) => {
    const t = await sequelize.transaction()
    try {
        //insert data on orderDetails model
        let orderDetailsData = await OrderDetails.create(body)
        console.log("orderDetailsData:", orderDetailsData.id)
        //iterate through the products array synchronously 
        let sum = 0;
        for (const product of body.products) {
            product.userId = body.userId;
            product.totalPrice = product.quantity * product.unitPrice;
            product.orderDetailsId = orderDetailsData.id;
            //calculate total amount 
            sum = sum + product.totalPrice;
            //insert products in userOrder table
            await UserOrders.create(product)
        }
        //console.log("body.userId",body.userId);
        //console.log("orderDetailsId:",orderDetailsData.id)
        //assign totalamount
        body.totalAmount = sum;
        //console.log(" orderDetailsData.totalAmount",orderDetailsData.totalAmount)
        //update the total amount ..initially it is having 0
        let updateTotalAmount = await OrderDetails.update(body, { where: { userId: body.userId } }, { transaction: t })
        console.log("update:", updateTotalAmount)
        //if no errors then commit the transactio
        await t.commit()
        //return successful response
        // delete orderDetailsData.products;
        console.log("orderdetails...", orderDetailsData)

        return { message: "order details created", payload: { orderDetailsData }, totalAmount: sum }
    } catch (error) {
        //if any error occurs then rollback the transaction
        await t.rollback()
        throw error
    }
}


//create payment
const createPayment = async (req) => {
    const t = await sequelize.transaction()
    try {
        //create payment with data
        let paymentData = await Payment.create(req.body, { transaction: t });
        //find orderDetails table with given orderID
        let orderDetails = await OrderDetails.findOne({ where: { id: req.params.orderId } })
        //update the paymentid 
        await orderDetails.update({ paymentId: paymentData.id }, { transaction: t })
        //sending successful response
        await t.commit()
        return { message: "payment successful" }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }
}


//customer can get specific product details
const getSpecificProduct = async (req) => {
    const t = await sequelize.transaction()
    try {
        //get product id from url
        let productIdfromUrl = req.params.productId;
        //check whether that product id is existed or not in product model
        let getProductData = await Product.findOne({
            where: {
                id: productIdfromUrl
            }, attributes: {
                exclude: ["createdAt", "updatedAt", "destroyTime"]
            }
        }, { transaction: t })

        //if no product is existed with that id
        if (getProductData === null) {
            return { message: "no product existed with that id" }
        }
        //if product found
        else {
            //save the transaction if no error occurs
            await t.commit()
            //send the required product details
            return { message: "product details", payload: getProductData }
        }
    } catch (error) {
        //if error occurs then rollback the transaction
        await t.rollback()
        throw error
    }
}




//get order details
const getOrderDetails = async (req) => {
    const t = await sequelize.transaction()
    try {
        //orderid from url
        let orderIdFromUrl = req.params.orderId
        //getting order details using orderid
        let orderData = await OrderDetails.findOne({
            where: {
                id: orderIdFromUrl
            }, attributes: {
                exclude: ["deletedAt", "createdBy", "updatedBy", "deletedBy"]
            }
        }, { transaction: t })
        //if the order id not found 
        if (orderData === null) {
            //send no one can  order with that id 
            return { message: "no order existed with that id" }
        }
        else {
            // let productData=await Product.findOne({where:{id:orderData.productId}})

            //send successful response
            await t.commit()
            return { message: "order data", payload: orderData }
        }
    } catch (error) {
        //if error occurs rllback the transaction
        await t.rollback()
        throw error
    }
}


module.exports = { createOrder, getAllProducts, orderDetail, createPayment, getSpecificProduct, getOrderDetails, ordersOfUser }