const {totalStatistics,supplierDetails,sellerDetails,customerDetails}=require("../../controllers/admin.controller")

const totalStatisticsHandler=async(req,res)=>{
    try{
        let result=await totalStatistics(req)
        res.send(result)

    }catch(error){
        res.send({"error":error.message})
    }
}
const supplierDetailsHandler=async(req,res)=>{
    try{
        let result=await supplierDetails(req)
        res.send(result)

    }catch(error){
        res.send({"error":error.message})
    }
}
const sellerDetailsHandler=async(req,res)=>{
    try{
        let result=await sellerDetails(req)
        res.send(result)

    }catch(error){
        res.send({"error":error.message})
    }
}
const customerDetailsHandler=async(req,res)=>{
    try{
        let result=await customerDetails(req)
        res.send(result)

    }catch(error){
        res.send({"error":error.message})
    }
}



module.exports={totalStatisticsHandler,supplierDetailsHandler,sellerDetailsHandler,customerDetailsHandler}