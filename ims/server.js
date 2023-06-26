//importing express module
const exp = require("express");

//creating express  application
const app = exp();

//for application protection
const helmet = require('helmet')
//it returns helmet middleware to hide the details of express implementation
//it is for security of backend
app.use(helmet())

//cors enables exprss application access control to allow restricted resources from being accessed
//from external domains
const cors = require('cors')
//middleware
app.use(cors())



//importing dotenv and configure it
require("dotenv").config();

//body parser
app.use(exp.json());

//establishing server connection
const PORT = process.env.PORT || 3000
console.log(PORT)
//application running on port
app.listen(PORT, () => console.log(`server is running on port number ${PORT}`))


//importing db.config
const sequelize = require("./db/db.config");

//establishing database connection using sequelize
sequelize.authenticate()
    .then(() => console.log("Database connection is success"))
    .catch(err => console.log("Error in database connection", err))

//to create tables 
sequelize.sync()

//importing router from index.js
let router = require("./routes/index")

//middleware for router
app.use("/", router)

//default error handling middleware
app.use((err, req, res, next) => {
    res.status(400).send({ message: "error", payload: err })
})

//invalid path middleware
app.use("*", (req, res, next) => {
    res.status(400).send({ message: "invalid path" })

})
module.exports = app;