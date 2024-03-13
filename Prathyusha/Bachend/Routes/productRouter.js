const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST request to create a new product
router.post('/', productController.createProduct);

// GET request to retrieve all products
router.get('/', productController.getAllProducts);

module.exports = router;
