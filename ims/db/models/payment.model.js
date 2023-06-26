//importing sequelize from database
const sequelize=require("../db.config");

//importing datatypes from sequelize
const {DataTypes}=require("sequelize");
//creating payment model
const Payment=sequelize.define("Payment",{
    paymentType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.STRING,
        allowNull:false
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
     timestamps:true,
     freezeTableName:true
 })


 module.exports=Payment;
 