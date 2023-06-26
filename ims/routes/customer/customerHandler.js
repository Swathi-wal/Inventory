const { createOrder, getAllProducts, orderDetail, createPayment, getSpecificProduct, getOrderDetails,ordersOfUser } = require("../../controllers/customer.controller")

const createOrderHandler = async (req, res) => {
    try {
        console.log("req.body...", req.body)
        const result = await createOrder(req.body)
        res.status(201).send(result)

    } catch (error) {
        res.status(400).send({ "error": error.message })

    }
}
const ordersOfUserHandler=async(req,res)=>{
    try{
        const result=await ordersOfUser(req)
        res.status(200).send(result)
    }catch(error){
        res.status(400).send({"error":error.message})

    }
}
const getAllProductsHandler = async (req, res) => {
    try {
        const result = await getAllProducts(req);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
}
const orderDetailsHandler = async (req, res) => {
    try {
        const result = await orderDetail(req.body)
        res.status(201).send(result)
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
}
const createPaymentHandler = async (req, res) => {
    try {
        const result = await createPayment(req)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
}
const getSpecificProductHandler = async (req, res) => {
    try {
        const result = await getSpecificProduct(req)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }
}
const getOrderDetailsHandler = async (req, res) => {
    try {
        const result = await getOrderDetails(req)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send({ "error": error.message })
    }

}

module.exports = { createOrderHandler, getAllProductsHandler, orderDetailsHandler, createPaymentHandler, getSpecificProductHandler,
     getOrderDetailsHandler,ordersOfUserHandler }
