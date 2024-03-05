const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/", productController.getAllProducts);
productRouter.post("/", productController.addProduct);
productRouter.get("/:id", productController.getProductById);

module.exports = productRouter;
