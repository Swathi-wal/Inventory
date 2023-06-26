//importing sequelize from db.config
const sequelize = require("../db/db.config");

//import bcryptjs
const bcryptjs = require("bcryptjs")

//import jsonwebtoken
const jwt = require("jsonwebtoken")


//export  usermodel
let User = require("../db/models/user.model")
//export  address model
const Address = require("../db/models/address.model");

//to register user or signup
const registerUser = async (body) => {
    const t = await sequelize.transaction();
    try {
        //check if user exists in usermodel or not
        let checkUserExists = await User.findOne({ where: { email: body.email } }, { transaction: t })
        //console.log("check user", checkUserExists);
        //if user is existed it means he/she already registered
        if (checkUserExists) {
            return { message: "user already registered" }
        } else {
            //take address from the body
            const addressResponse = await Address.create(body.address, { transaction: t });
            //console.log(body.address)
            //throw new Error();
            //console.log("AddressResponse",addressResponse)
            delete body.address;
            body.addressId = addressResponse.dataValues.id;
            //console.log(body)
            //take password from request.body
            let password = body.password;
            //hash the password using bcryptjs
            let newPassword = await bcryptjs.hash(password, 5)
            //console.log(newPassword)
            //assign hashed password to the old password
            body.password = newPassword
            //insert user data to usermodel
            await User.create(body, { transaction: t });
            //commit the transaction if no error is thrown
            await t.commit();
            //for successful creation send message like user created
            return { message: "user registered" }
        }
    }
    catch (error) {
        //if error is thrown we rollback the transaction
        await t.rollback();
        throw error
    }
};
//for login
const loginUser = async (body) => {
    const t = await sequelize.transaction();
    try {
        //check if email exists or not
        let { email, password } = body
        //checking user is registered or not
        let checkUser = await User.findOne({
            where: { email: email },
            attributes: {
                exclude: ["deletedAt", "createdBy", "updatedBy", "deletedBy", "createdAt", "updatedAt"]
            }
        }, { transaction: t })
        console.log(checkUser)
        //if user is not registered
        if (checkUser === null) {
            return { message: "invalid email" }
        } else {
            //verify password using bcryptjs
            let verifyPassword = await bcryptjs.compare(password, checkUser.password)
            console.log("veriftPwd", verifyPassword)
            //if password is invalid
            if (verifyPassword === false) {
                return { message: "Invalid Password" }
            } else {
                //if role is not assigned
                if (checkUser.role === null) {
                    return { message: "unauthorized access" }
                }
                //if role is assigned
                else {
                    //create jwt token and send to client
                    let signedToken = jwt.sign({
                        role: checkUser.role,
                        email: checkUser.email,
                        id: checkUser.id
                    }, process.env.SECRET_KEY || "", { expiresIn: "6d" })
                    //remove password
                    delete checkUser.password
                    //if no error is thrown commit the transaction
                    await t.commit()

                    //send jwt token as  response with login success message
                    return { message: "Login success", token: signedToken, user: checkUser }
                }
            }
        }
    } catch (error) {
        //if error is thrown we rollback the transaction
        await t.rollback();
        throw error
    }
};



//route to get user details with address
const getUserDetailsWithAddress = async (req) => {
    //check if user existed or not
    const t = await sequelize.transaction();
    try {
        console.log("paramsid", req.params.userId);
        let userDetails = await User.findOne({
            where: { id: req.params.userId }
        }, { transaction: t });
        //if user not found
        //console.log("userDetails...",userDetails);
        if (userDetails === null) {
            return { message: "user not existed" }
        }
        //if user found
        else {
            //get the address of required user by including the address model
            let UserWithAddress = await User.findOne({
                where: { id: req.params.userId },
                include: [
                    {
                        model: Address,
                        attributes: { exclude: ["id", "createdAt", "updatedAt", "createdBy", "updatedBy", "deletedAt", "deletedBy"] }, // Exclude the 'id' property from the address model
                    },
                ],
                //exclude the id and password attributes
                attributes: { exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy", "deletedAt", "deletedBy", "password"] },
            }, { transaction: t });
            console.log("address:", UserWithAddress)
            //if no error is occured then commit the transaction
            await t.commit()
            return { "message": "user with address", payload: UserWithAddress }
        }
    } catch (error) {
        // if error is thrown we rollback the transaction
        await t.rollback();
        throw error;
    }

}

module.exports = { registerUser, loginUser, getUserDetailsWithAddress }