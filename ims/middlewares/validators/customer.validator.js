//import joi
var Joi = require("joi")

const validator = (schema, payload) => schema.validate(payload, { abortEarly: false })

const orderSchema = Joi.object({
  totalAmount: Joi.number().default(0),
  userId: Joi.number().required(),
  paymentId: Joi.alternatives().try(Joi.string().allow(null), Joi.number().allow(null)),
  deliveryFee: Joi.number().default(0),
  deliveryDate: Joi.date(),
  deliveryAddressId: Joi.number(),
  tax: Joi.number().default(0),
  products: Joi.array().items(
    Joi.object({
      id: Joi.number(),
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
      unitPrice: Joi.number().required(),
      totalPrice: Joi.number().default(0),
      userId: Joi.number(),
      deletedAt: Joi.number(),
      createdBy: Joi.number(),
      updatedBy: Joi.number(),
      deletedBy: Joi.number(),
      createdAt: Joi.date()
    })
  ),
});
const orderIdSchema = Joi.object({
  orderId: Joi.number().required()
})

const productIdSchema = Joi.object({
  productId: Joi.number().required()
})

//exports validateregistrationschema
exports.validateOrderSchema = (req, res, next) => {
  //validate req.body
  const { error, value } = validator(orderSchema, req.body)
  if (error) {
    // Handle validation errors
    const validationErrors = error.details.map((err) => err.message);
    //console.log(validationErrors)
    //send response
    return res.status(400).json({ errors: validationErrors });
  }
  next()
}

exports.validateOrderId = (req, res, next) => {
  //validate req.body
  const { error, value } = validator(orderIdSchema, req.params)
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





