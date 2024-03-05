const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

//load config from env file
dotenv.config()
const app = express()
app.use(cors())

//middleware to parse json request body
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const PORT =  process.env.PORT || 5000;

//import routes for product API
const productRouter = require('./routes/productroute');
const userRouter = require('./routes/userRoute');
//mount the product API routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);



//start server
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})

//connect to the database
const connectDB = require("./config/database");
connectDB()

//default Route
app.get("/", (req, res) => {
    res.json({
        message: "Server is running on the webpage"
    })
})

module.exports = app;