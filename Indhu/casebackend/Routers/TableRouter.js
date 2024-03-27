const express=require('express');
const TableRouter=express.Router();
const TableController=require("../Controller/TableController");

TableRouter.get("/",TableController.getAllUProducts);
TableRouter.get("/:productId",TableController.getProductById);
TableRouter.get("/search",TableController.findProductByName);
TableRouter.post("/add",TableController.createProducts);
TableRouter.delete("/:productId",TableController.deleteProductById);
TableRouter.put("/update/:id",TableController.updateProductById);
module.exports=TableRouter;