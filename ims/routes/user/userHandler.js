const {registerUser,loginUser,getUserDetailsWithAddress}=require("../../controllers/user.controller")

const registerHandler=async(req,res)=>{
    try{
        const result=await registerUser(req.body);
        res.status(201).send(result)

    }catch(error){
        res.status(400).send({"error":error.message})

    }
}
const loginHandler=async(req,res)=>{
    try{
        const result=await loginUser(req.body);
        res.status(201).send(result)

    }catch(error){
        res.send({"error":error.message})
    }
}
const getUserDetailsWithAddressHandler=async(req,res)=>{
    try{
        const result=await getUserDetailsWithAddress(req);
        res.send(result)
    }catch(error){
        res.send({"error":error.message})
    }
}
module.exports={registerHandler,loginHandler,getUserDetailsWithAddressHandler}