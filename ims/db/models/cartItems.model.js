//importing sequelize from database
const sequelize=require("../db.config");

//importing datatypes from sequelize
const {DataTypes}=require("sequelize");
//import product model
let Product=require("../models/product.model")
//import user model
let User=require("../models/user.model")

//creating cartItems model 
const CartItems=sequelize.define("CartItems",{ 
   productId:{
    type:DataTypes.INTEGER,
    references:{
        model:'Product',
        key:'id'
    }
   },
   quantity:{
    type:DataTypes.INTEGER
   },
   userId:{
    type:DataTypes.INTEGER,
    references:{
        model:'User',
        key:'id'
    }

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
  deletedAt: {
    type: DataTypes.DATE
  },
  deletedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id'
    },
  defaultValue:null}
},{
    timestamps:false,
    freezeTableName:true,
    tableName:"CartItems"
})

module.exports=CartItems;
