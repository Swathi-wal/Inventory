//import expressasynchandler
let expressAsyncHandler = require("express-async-handler")

//import product model
let Product = require("../db/models/product.model")

//import orderModel
let UserOrders = require("../db/models/userOrder.model")

//import user model
let User = require("../db/models/user.model")

//import payment model
let Payment = require("../db/models/payment.model")
const sequelize = require("../db/db.config")

//to get total products,total orders, total customer,total sales
const totalStatistics = async (req) => {
    const t=await sequelize.transaction()
    try {
        //geting number of products
        let totalProducts = await Product.findAll({transaction:t});
        //getting number of orders
        let totalOrders = await UserOrders.findAll({transaction:t});
        //getting number of successful orders
        // let totalSales=await Payment.findAll({where:{paymentStatus:"completed"}});
        //getting number of customers
        let totalCustomers = await User.findAll({ where: { role: "customer" } })
        console.log("totalProducts:", totalProducts.length)
        console.log("totalOrders:", totalOrders.length)
        // console.log("totalSales:",totalSales.length)
        console.log("totalCustomers:", totalCustomers.length)
        await t.commit()
        //send successful response 
        return ({ message: "statistics", TotalProducts: totalProducts.length, TotalOrders: totalOrders.length, TotalCustomers: totalCustomers.length })
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }

}


//admin can get all supplier details
const supplierDetails = async (req) => {
    const t = await sequelize.transaction()
    try {
        //getting all supplier details
        let supplierData = await User.findAll({
            where: { role: "supplier" }, attributes: {
                exclude: ["password", "deletedAt", "createdBy", "updatedBy", "deletedBy"]
            }
        }, { transaction: t })
        //sending supplier data as response
        await t.commit()
        return { message: "supplier data", payload: supplierData }
    } catch (error) {
        await t.rollback()
        throw error
    }
}

//admin can get all seller details
const sellerDetails = async (req) => {
    const t = await sequelize.transaction()
    try {
        //getting all seller details
        let sellerData = await User.findAll({
            where: { role: "seller" }, attributes: {
                exclude: ["deletedAt", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "password"]
            }
        }, { transaction: t })
        //sending seller data as response
        await t.commit()
        return { message: "seller data", payload: sellerData }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }
}

//admin can get all customer details
const customerDetails = async (req, res) => {
    const t = await sequelize.transaction()
    try {
        //getting all customer details
        let customerData = await User.findAll({
            where: { role: "customer" }, attributes: {
                exclude: ["deletedAt", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt", "password"]
            }
        }, { transaction: t })
        //sending all customer data as response
        await t.commit()
        return { message: "customer data", payload: customerData }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        return error
    }
}

module.exports = { totalStatistics, supplierDetails, sellerDetails, customerDetails }