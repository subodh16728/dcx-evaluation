const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const { productname, price, description } = req.body;

  try {
    // Checking if the product already exists
    const existingProduct = await Product.findOne({ productname });

    if (existingProduct) {
      // If Product already exists
      return res.status(400).json({ message: 'Product already exists' });
    }

    // If product doesn't exist, create a new one
    const product = new Product({
      productname,
      price,
      description
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ productname: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

