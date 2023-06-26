//importing sequelize from database
const sequelize=require("../db.config");

//importing datatypes from sequelize
const {DataTypes}=require("sequelize");

//creating address model 
const Address=sequelize.define("Address",{
   pincode:{
    type:DataTypes.INTEGER,
    allowNull:false
   },
   street:{
    type:DataTypes.STRING,
    allowNull:false
   },
   city:{
    type:DataTypes.STRING,
    allowNull:false
   },
   district:{
    type:DataTypes.STRING,
    allowNull:false
   },
   country:{
    type:DataTypes.STRING,
    allowNull:false
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
    allowNull:true,
    defaultValue:null
  },
  updatedBy:{
    type:DataTypes.INTEGER,
    allowNull:true,
    defaultValue:null
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull:true
  },
  deletedBy:{
    type:DataTypes.DATE,
    allowNull:true
  }
},{
    timestamps:true,
    freezeTableName:true,
    tableName:"Address"
})
module.exports=Address;
