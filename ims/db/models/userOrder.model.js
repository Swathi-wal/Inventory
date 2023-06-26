//importing sequelize from database
const sequelize = require("../db.config");

//importing datatypes from sequelize
const { DataTypes } = require("sequelize");
//import address model
const Address=require("../models/address.model")

//import porduct model
const Product=require("../models/product.model")

//import user model
const User=require("../models/user.model")

//import orderDetails model
const OrderDetails=require("../models/orderDetails.model")


//creating userorder model
const UserOrders = sequelize.define("UserOrders", {
    productId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Product',
            key:'id'
        }
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    unitPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    totalPrice:{
        type:DataTypes.FLOAT,
        allowNull:true,
        defaultValue:null
    },
    
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'User',
            key:'id'
        }
    },
    orderDetailsId:{
        type:DataTypes.INTEGER,
        references:{
            model:'OrderDetails',
            key:'id'
        }
    },
    deletedAt:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    createdBy:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null
    },
    updatedBy:{
        type:DataTypes.INTEGER,
        allowNull:true,
        defaultValue:null
    },
    deletedBy:{
        type:DataTypes.INTEGER,
        allowNull:true
    }   
}, {
    timestamps: true,
    freezeTableName: true
})
//association between orderDetails and userorder
//UserOrders.belongsTo(OrderDetails,{foreignKey:"orderDetailsId"})

module.exports=UserOrders;
