//import jwt web token
const jwt=require("jsonwebtoken");
//import dotenv
require('dotenv').config();

//verifying received token
const customerVerifyToken=(req,res,next)=>{
    
    //token verification logic
    //get bearer token from headers of req
    let bearerToken=req.headers.authorization;
    console.log(bearerToken);
    //check existance of bearer token
    if(bearerToken===undefined)
    {
        res.status(401).send({message:"unauthorized access"});
    }
    //if bearer token is existed get token from bearer token
    else{
        let token=bearerToken.split(" ")[1];//[bearer,token]
        try{
                    //decode the token
                let decode=jwt.verify(token,process.env.SECRET_KEY||"");
                if(decode.role==="customer"){
                    req.email=decode.email
                //go to next
                next()
                }
                else{
                    //send unauthorized access
                    res.status(401).send({message:"unauthorized access..only customer can access"});
                }
                
        }
        //if error
        catch(err)
        {
            //send again login message
            res.status(401).send({message:"please relogin to continue..."})

        }
    }
    //decode the token=verification
}
//exports customerverifytoken
module.exports=customerVerifyToken;