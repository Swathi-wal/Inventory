//importing sequelize from database
const sequelize=require("../db.config");

//importing datatypes from sequelize
const {DataTypes}=require("sequelize");

//import user model
const User=require('../models/user.model')

//import payment model
const Payment=require("../models/payment.model")

//import userorders model
const UserOrders=require("../models/userOrder.model")

//creating shipment details model
const OrderDetails=sequelize.define("OrderDetails",{
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'User',
            key:'id'
        }
    },
    totalAmount:{
        type:DataTypes.FLOAT
    },
    paymentId:{
        type: DataTypes.INTEGER,
        references:{
            model:'Payment',
            key:'id'
        },
        allowNull:true  
    },
    deliveryFee:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    deliveryDate:{
        type: DataTypes.DATE
    },
    deliveryAddressId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tax:{
        type:DataTypes.INTEGER,
        allowNull:true
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
        allowNull:true,
        defaultValue:null
    }
   
 },{
     timestamps:false,
     freezeTableName:true,   
 })
//associations
OrderDetails.belongsTo(Payment,{foreignKey:"paymentId"})
//OrderDetails.hasMany(UserOrders,{foreignKey:"orderDetailsId"})

module.exports=OrderDetails;

 