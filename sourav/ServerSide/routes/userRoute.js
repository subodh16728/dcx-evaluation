const express = require('express');
const userRouter = express.Router();

//import controller 
const userController = require("../controllers/userController");


//define API routers 
userRouter.post("/signup", userController.userSignUp);
userRouter.post("/login",userController.userlogin);



module.exports = userRouter;