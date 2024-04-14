const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
  const { name, description, price, category, features } = req.body;

  try {
    // Checking if the product already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      // If Product already exists
      return res.status(400).json({ message: 'Product already exists' });
    }

    // If product doesn't exist, create a new one
    const product = new Product({
      name,
      description,
      price,
      category,
      features
      
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { name, description, price, category, features } = req.body;

  try {
    // Check if the product with the given ID exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update the product details
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.features = features;

    // Save the updated product
    const updatedProduct = await existingProduct.save();

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.toggleBookmark = async (req, res) => {
  const { productId } = req.params;
  const bookmarkProduct = req.body.bookmarked

  if (productId != null) {
    Product.findByIdAndUpdate(productId, { bookmarked: bookmarkProduct })
      .then(() => res.status(201).send("Updated sucessfuly"))
      .catch((err) => res.status(400).send(err => "id not found" + err));;
  }
  else {
    res.status(401).send(`Product with id ${productId} does not exist`);
  }
};

exports.getAllBookmarkedProducts = async (req, res) => {
  try {
    const bookmarkedProducts = await Product.find({ bookmarked: true });
    res.json(bookmarkedProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
