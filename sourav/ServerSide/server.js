const nodemailer = require("nodemailer");
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

const PORT = process.env.PORT || 5000;

//import routes for product API
const productRouter = require('./routes/productroute');
const userRouter = require('./routes/userRoute');
const offerRouter = require('./routes/offersroute');
//mount the product API routes
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);
app.use("/api/offer", offerRouter);


// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true, // Use `true` for port 465, `false` for all other ports
//     auth: {
//         user: 'souravmallick6434@gmail.com',
//         pass: 'ksni yzfm lrqj gqqv'
//     },
// });
 
// const mailOptions = {
//     from: {
//         name: 'Latest Offers',
//         address: 'souravmallick6434@gmail.com'
//     },
//     to: ['souravranjanmallick6434@gmail.com'],
//     subject: 'Latest Offers for you',
//     text: 'Get 50% discount on Electronics accessories'
// }
 
// const sendMail = async (transporter, mailOptions) => {
//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email has been sent!')
//     } catch (error) {
//         console.log(error)
//     }
// }
 
// sendMail(transporter, mailOptions);








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