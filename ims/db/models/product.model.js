
//importing sequelize from database
const sequelize=require("../db.config");

//importing datatypes from sequelize
const {DataTypes}=require("sequelize");

//importing user model
const User=require("../models/user.model")

//importing  models
const UserOrders=require("../models/userOrder.model")
const OrderDetails=require("../models/orderDetails.model")
const CartItems=require("../models/cartItems.model")

//creating product model
const Product=sequelize.define("Product",{
  image:{
    type:DataTypes.STRING
  }, 
   productName:{
    type:DataTypes.STRING,
    allowNull:false
   },
   price:{
    type:DataTypes.FLOAT,
    allowNull:false
   },
   perPackQuantity:{
    type:DataTypes.INTEGER,
    defaultValue:null
   },
   quantity:{
    type:DataTypes.BIGINT,
    allowNull:false
   },
   description:{
    type:DataTypes.STRING
   },
   createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    },
    defaultValue:null
  },
  updatedBy:{
    type:DataTypes.INTEGER,
    allowNull:true,
    defaultValue:null
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull:true,
    defaultValue:null
  }  
},{
    paranoid:true,
    deletedAt:'destroyTime',
    timestamps:true,
    freezeTableName:true
})
//Association 
//Product.hasMany(UserOrders,{foreignKey:"productId",onDelete:"CASCADE",onUpdate:"CASCADE"})
//Product.hasMany(CartItems,{foreignKey:"productId",onDelete:"CASCADE",onUpdate:"CASCADE"})



//export product model
module.exports=Product;

