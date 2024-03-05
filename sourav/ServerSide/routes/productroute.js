const express = require('express');
const productRouter = express.Router();
//import controller
const productController = require('../controllers/productController');
const {auth} = require("../middlewares/auth");

//define API routes
productRouter.post("/createProduct", productController.createProduct);
productRouter.get("/:getProduct", productController.getProduct);
productRouter.get("/id/:id", productController.getProductById);
productRouter.delete("/:id", productController.DeleteProduct);





module.exports = productRouter;