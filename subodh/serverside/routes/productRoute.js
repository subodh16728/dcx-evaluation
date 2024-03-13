const express = require("express");
const productController = require("../controllers/productController");
const productRoute = express.Router()

productRoute.get("/", productController.getProduct);
productRoute.post("/add", productController.addProduct);
productRoute.get("/bookmarks", productController.getBookmarks)
productRoute.get("/:id", productController.getProductById);
productRoute.put("/edit/:id", productController.updateProduct)

module.exports = productRoute;