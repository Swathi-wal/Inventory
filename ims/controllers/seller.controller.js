
//importing sequelize from db.config
const sequelize = require("../db/db.config");

//import product model
const Product = require("../db/models/product.model")

//import nodecron
var cron = require('node-cron')

var productsData = [{
    "productName": "bluetooth",
    "price": 200,
    "perPackQuantity": 1,
    "quantity": 1,
    "description": "desc",
    "createdBy": 2
}, {
    "productName": "bluetooth",
    "price": 200,
    "perPackQuantity": 1,
    "quantity": 1,
    "description": "desc",
    "createdBy": 1
}]
//defining the job function
const job = async (productsData) => {
    await Promise.all(
        productsData.map(async (product, index) => {
            await Product.create(product);
            console.log("product created");
        })
    );

};

//background job to add items everyday at 7pm
cron.schedule("16 19 * * *", () => {
    console.log("cron scheduler")
    //function call
    // job(productsData);
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
})

//product creation
const createProduct = async (body) => {
    const t = await sequelize.transaction()
    try {
        //to create product
        await Product.create(body, { transaction: t });
        //product successfully created
        await t.commit();
        return { message: "product created" }
    }
    catch (error) {
        //if error occurs rollback the transaction
        await t.rollback();
        throw error
    }
}




//product updation
const updateProduct = async (req) => {
    const t = await sequelize.transaction();
    //console.log("productId..", req.params.productId)
    try {
        //check whether that product is exists or not
        let productExists = await Product.findOne({ where: { id: req.params.productId } }, { transaction: t })
        console.log("productExist...", productExists)
        //if product not found
        if (!productExists) {
            return { message: "product not existed" }
        }//product found 
        else {
            //to update product  
            let productUpdate = await Product.update(req.body, { where: { id: req.params.productId } }, { transaction: t })
            console.log(productUpdate)
            // products details not updated
            if (productUpdate === 0) {
                return { message: "nothing to update" }
            }
            else {
                //save the transaction
                await t.commit()
                //send successful update response
                return { message: "product is updated successfully" }

            }
        }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback();
        throw error
    }
}


//to get all products
const getAllProducts = async (req, res) => {
    //transaction
    const t = await sequelize.transaction();
    try {
        //to get all products
        let allProducts = await Product.findAll({
            where: { createdBy: req.params.sellerId },
            attributes: {
                exclude: ["createdAt", "updatedAt", "destroyTime", "updatedBy", "deletedAt"]
            }
        }, { transaction: t });
        //console.log("products",allProducts.length);
        //if no products exists
        if (allProducts.length === 0) {
            return { message: "no products available" }
        } else {
            await t.commit()
            //send all products details as response
            return { message: "get products", payload: allProducts }
        }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }
}




//product deletion
const deleteProduct = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        //first check if the product is existed in product model or not
        let checkProductExists = await Product.findOne({ where: { id: req.params.productId } }, { transaction: t })
        console.log("checkProduct", checkProductExists);
        //if product is not existed
        if (checkProductExists === null) {
            return { message: "product is not existed to delete" };
        }
        else {
            //soft deletion of product 
            await Product.destroy({
                where: {
                    id: req.params.productId
                },
                force: true
            }, { transaction: t })
            await t.commit();
            return { message: "product successfully deleted" }

        }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error
    }
}



//get product by id
const getProductsById = async (req) => {
    const t = await sequelize.transaction();
    try {
        //check whether product exists or not in product model
        let getProduct = await Product.findOne({
            where: { id: req.params.productId, createdBy: req.params.sellerId },
            attributes: {
                exclude: [
                    "createdAt",
                    "updatedAt",
                    "destroyTime",
                    "updatedBy",
                    "deletedAt"
                ]
            }
        }, { transaction: t });
        //if no product exists with that id
        if (getProduct == null) {
            //send no product existed
            return { message: "product is not existed to display" }
        }
        //if product exists
        else {
            await t.commit()
            //send product details
            return { message: "product details", payload: getProduct }
        }
    } catch (error) {
        //if error occurs rollback the transaction
        await t.rollback()
        throw error

    }
}


module.exports = { createProduct, updateProduct, getAllProducts, getProductsById, deleteProduct }