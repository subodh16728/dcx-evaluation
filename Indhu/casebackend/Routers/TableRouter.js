const express=require('express');
const TableRouter=express.Router();
const TableController=require("../Controller/TableController");

TableRouter.get("/",TableController.getAllUProducts);
TableRouter.get("/search",TableController.findProductByName);
TableRouter.post("/",TableController.createProducts);

module.exports=TableRouter;