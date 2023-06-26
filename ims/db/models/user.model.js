
//importing sequelize from database
const sequelize = require("../db.config");

//importing datatypes from sequelize
const { DataTypes } = require("sequelize");

//importing addressmodel
const Address = require("../models/address.model");

//import userorder
const UserOrders = require("../models/userOrder.model");
const CartItems = require("./cartItems.model");
const Product=require("./product.model")


//import cartitems model


//creating user model
const User = sequelize.define("User", {
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    addressId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Address',
            key: "id"
        }
    },
    deletedAt: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    deletedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    }

}, {
    timestamps: true,
    freezeTableName: true,
    tableName: "User"
});
//association between usermodel and addressmodel==>1-m
User.belongsTo(Address, { foreignKey: "addressId" });

//create 1-m association between userModel and userOrder model
User.hasMany(UserOrders, { foreignKey: "userId" });

//create association between user and cartitems
User.hasMany(CartItems,{foreignKey:"userId",onUpdate:"cascade",onDelete:"cascade"})

//creating userProduct as junction table ,association between user and product ==>junction table userProduct
User.belongsToMany(Product,{ through:'UserProducts'})
Product.belongsToMany(User,{ through:'UserProducts'})

module.exports = User;


