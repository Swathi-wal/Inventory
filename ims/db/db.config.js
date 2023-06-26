//importing sequelize
const {Sequelize}=require("sequelize");

//importing dotenv and configure
require("dotenv").config();

//creating instance for sequelize 
const sequelize=new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:'localhost',
        dialect:'mysql'
    }
);
//export sequelize
module.exports=sequelize;

