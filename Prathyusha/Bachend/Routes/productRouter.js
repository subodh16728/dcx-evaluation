const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// POST request to create a new product
router.post('/', productController.createProduct);

// GET request to retrieve all products
router.get('/', productController.getAllProducts);
router.get('/bookmarked-products', productController.getAllBookmarkedProducts);
router.get('/:productId', productController.getProductsById);
// PUT request to update a product
router.put('/:productId', productController.updateProduct);


// POST request to toggle bookmark status of a product
router.put('/bookmark/:productId', productController.toggleBookmark);



module.exports = router;
