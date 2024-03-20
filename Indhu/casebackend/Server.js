const express= require("express");
const app=express();
const cors=require('cors');
const mongoose=require('mongoose');

const TableRouter=require("./Routers/TableRouter");
const RegisterRouter = require("./Routers/RegisterRouter");
const BookmarkRouter = require("./Routers/BookmarkRouter");
const ORouter=require("./Routers/Offersrouter");

//middleware
app.use(cors({origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

const dburl = 'mongodb://127.0.0.1:27017/Userdb';
 
 
mongoose.connect(dburl)
    .then(() => console.log("connection with mongodb is successful"))
    .catch(() => console.log("connection with mongodb failed"));
    


//default route
// app.get('/', (req, res) => {
//     res.status(200).send("An api for user")
// });

app.use('/api/table', TableRouter)
app.use("/api",RegisterRouter)
app.use("/api/bookmark",BookmarkRouter);
app.use("/api/myoffers",ORouter);

app.listen(3000,()=>console.log("Server running..."))

