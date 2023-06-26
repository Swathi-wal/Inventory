//import joi
var Joi=require("joi")

const validator=(schema,payload)=>schema.validate(payload,{abortEarly:false});

//named export => logic for validation of user registration 
 const signUpSchema=Joi.object().keys({
        role:Joi.string().required().valid("customer","seller","admin","supplier"),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }),
        password:Joi.string().required(), 
        mobile:Joi.number().integer().min(1000000000).max(9999999999).required(),
        address:Joi.object().keys({
            pincode:Joi.number().min(100000).max(999999).required(),
            street:Joi.string().required(),
            city:Joi.string().required(),
            district:Joi.string().required(),
            country:Joi.string().required()

        })

})

//for validation logic for login  

const loginInSchema=Joi.object().keys({
        email:Joi.string().email({
            minDomainSegments:2,
            tlds:{allow:["com","in"]}
        }),
        password:Joi.string().required()
})

//validation of userId in req.params
const userId=Joi.object({
    userId:Joi.number().required()
})

//exports validateregistrationschema
exports.validateRegistration=(req,res,next)=>{
    //validate req.body
    const {error,value}=validator(signUpSchema,req.body)
    if(error){
      // Handle validation errors
     const validationErrors = error.details.map((err) => err.message);
     //console.log(validationErrors)
     //send response
     return res.status(400).json({ errors: validationErrors });
    }
    next()
}

//export validateLogin
exports.validateLogin=(req,res,next)=>{
    //validate req.body
    const {error,value}=validator(loginInSchema,req.body)
    if(error){
      // Handle validation errors
     const validationErrors = error.details.map((err) => err.message);
     //console.log(validationErrors)
     //send response
     return res.status(400).json({ errors: validationErrors });
    }
    next()  
}

//exports validate userID
exports.validateUserId=(req,res,next)=>{
    //validate req.params
    const {error,value}=validator(userId,req.params)
    if(error){
        //handle validation errors
        const validationErrors=error.details.map((err)=>err.message);
        return res.status(400).json({errors:validationErrors});
    }
    next()
}








