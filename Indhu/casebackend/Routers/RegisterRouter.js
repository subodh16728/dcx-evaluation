const express=require("express");
const RegisterRouter=express.Router();
const RegisterContoller=require("../Controller/RegisterContoller");
const Middleware = require("../Middleware");

RegisterRouter.get("/register",RegisterContoller.getAllUsers);
RegisterRouter.post("/register",RegisterContoller.createUser);
RegisterRouter.post("/login",RegisterContoller.loginUser);
RegisterRouter.get("/myprofile",Middleware,RegisterContoller.getObject)

module.exports=RegisterRouter