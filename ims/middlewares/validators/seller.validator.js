//import joi
var Joi = require("joi")

const validator = (schema, payload) => schema.validate(payload, { abortEarly: false })

const productSchema = Joi.object({
    //id: Joi.number().required(),
    productName: Joi.string().required(),
    price: Joi.number().required(),
    perPackQuantity: Joi.number().required(),
    quantity: Joi.number().required(),
    description: Joi.string().required(),
    createdBy: Joi.number().optional(),
    image: Joi.string().optional()
})

const sellerIdSchema = Joi.object({
    sellerId: Joi.number().required()
})

const productIdSchema = Joi.object({
    productId: Joi.number().required()
})

const idSchema = Joi.object({
    sellerId: Joi.number().required(),
    productId: Joi.number().required()

})



exports.validateProduct = (req, res, next) => {
    //validate req.body
    const { error, value } = validator(productSchema, req.body)
    if (error) {
        // Handle validation errors
        const validationErrors = error.details.map((err) => err.message);
        //console.log(validationErrors)
        //send response
        return res.status(400).json({ errors: validationErrors });
    }
    next()

}
exports.validateProductId = (req, res, next) => {
    //validate req.body
    console.log("params..", req.params)
    const { error, value } = validator(productIdSchema, req.params)
    if (error) {
        // Handle validation errors
        const validationErrors = error.details.map((err) => err.message);
        //console.log(validationErrors)
        //send response
        return res.status(400).json({ errors: validationErrors });
    }
    next()

}
exports.validateSellerId = (req, res, next) => {
    //validate req.body
    const { error, value } = validator(sellerIdSchema, req.params)
    if (error) {
        // Handle validation errors
        const validationErrors = error.details.map((err) => err.message);
        //console.log(validationErrors)
        //send response
        return res.status(400).json({ errors: validationErrors });
    }
    next()
}

exports.validateId = (req, res, next) => {
    //validate req.body
    const { error, value } = validator(idSchema, req.params)
    if (error) {
        // Handle validation errors
        const validationErrors = error.details.map((err) => err.message);
        //console.log(validationErrors)
        //send response
        return res.status(400).json({ errors: validationErrors });
    }
    next()
}
