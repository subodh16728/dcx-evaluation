const express = require('express');
const productRouter = express.Router();
//import controller
const productController = require('../controllers/productController');

const {auth} = require("../middlewares/auth");

//define API routes
productRouter.post("/createProduct", productController.createProduct);
productRouter.put("/createProduct/:id", productController.updateProductById);
productRouter.put("/bookmark/:id", productController.UpdateBookmark);
productRouter.get("/:getProduct", productController.getProduct);
productRouter.get("/id/:id", productController.getProductById);
productRouter.delete("/deleteall", productController.DeleteAllProduct);
productRouter.delete("/:id", productController.DeleteProduct);
productRouter.get("/bookmark/:id", productController.getProductByBookmark);
productRouter.get("/your/:wishlist", productController.getProductByWishlist);





module.exports = productRouter;