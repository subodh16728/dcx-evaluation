
const express=require('express');
const mongoose=require('mongoose');
const Registeruser=require('./models/userModel');
const cors = require('cors');
const app=express();
 
const dburl = 'mongodb://127.0.0.1:27017/userdb';
 
mongoose.connect(dburl)
    .then(() => console.log("connection with mongodb is successful"))
    .catch(() => console.log("connection with mongodb failed"));
 
 
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(express.urlencoded({
    extended : true
}));
 
const userRouter = require('./Routes/userRouter');
 
app.use('/api',userRouter);
const productrouter=require('./Routes/productRouter');
app.use('/api/products',productrouter)
 
 
app.listen(4000,()=>{
    console.log("server running")
})