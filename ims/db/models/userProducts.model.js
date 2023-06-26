//importing sequelize from database
const sequelize = require("../db.config");

//importing datatypes from sequelize
const { DataTypes } = require("sequelize"); 
//import user model and products model

const User=require("../models/user.model");
const Product=require("../models/product.model")


//creating userproducts model
const UserProducts=sequelize.define("UserProducts", {
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:'User',
            key:'id'
        }
    },
    productId:{
        type:DataTypes.INTEGER,
        references:{
            model:'Product',
            key:"id"
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
});

module.exports=UserProducts;
