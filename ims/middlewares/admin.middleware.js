//import jwt web token 
const jwt=require("jsonwebtoken");

//import dotenv
require('dotenv').config();

//verify received token
const adminVerifyToken=(req,res,next)=>{
    //get bearer token from headers of request
    let bearerToken=req.headers.authorization;
    console.log(bearerToken);
    //check existance of bearer token
    if(bearerToken===undefined){
        res.status(401).send({message:"unauthorized access"})
    }
    //if bearer token exists get token by splitting it
    else{
        let token=bearerToken.split(" ")[1];//[bearer,token]
        try{
            //decode the token
            let decode=jwt.verify(token,process.env.SECRET_KEY||"");
            //check the role is admin or not
            if(decode.role==="admin"){
                req.email=decode.email;
                //go to next
                next()
            }
            else{
                //send unauthorized response
                res.status(401).send({message:"unauthorized access..only admin can access"})
            }
        }
        //if error exists
        catch(err){
            res.status(401).send({message:"please relogin to continue..."})
        }
    }
    //decode the token is nothing but verification 
}
//export admin verify token
module.exports=adminVerifyToken