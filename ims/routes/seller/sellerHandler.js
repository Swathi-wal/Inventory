const {createProduct, updateProduct,getAllProducts,getProductsById,deleteProduct}=require("../../controllers/seller.controller");

const createProductHandler=async(req,res)=>{
    try{
        const result=await createProduct(req.body);
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({"error":error.message})
    }
}
const  updateProductHandler=async(req,res)=>{
    try{
        const result=await updateProduct(req);
        res.status(202).send(result)
    }catch(error){
        res.status(400).send({"error":error.message})
    }
}
const getAllProductsHandler=async(req,res)=>{
    try{
        const result=await getAllProducts(req);
        res.status(200).send(result)

    }catch(error){
        res.status(400).send({"error":error.message})

    }
}
const getProductsByIdHandler=async(req,res)=>{
    try{
        const result=await getProductsById(req);
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({"error":error.message})
    }
}

const deleteProductHandler=async(req,res)=>{
    try{
        const result=await deleteProduct(req);
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({"error":error.message})
    }
}

module.exports={createProductHandler,updateProductHandler,getAllProductsHandler,getProductsByIdHandler,deleteProductHandler}