const Product = require("../Models/productModel");

//add product in database
exports.addProduct = async (req, res) => {
  const newProduct = req.body;
  if (newProduct != null) {
    try {
      const product1 = await Product.findOne({
        productName: newProduct.productName,
      });
      if (product1) {
        return res.status(400).send("Product Already Exists");
      }

      await Product.create(newProduct);
      res.status(201).send("Product Added successfully");
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  } else {
    res.status(400).send("New Product details not received");
  }
};

//fetching All products from database
exports.getAllProducts = (req, res) => {
  Product.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send({ error: err }));
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  if (id != null) {
    Product.findById(id)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).send({ error: err }));
  } else {
    res.status(401).send(`Product Id:${id} doesnot exist`);
  }
};

exports.updateById = async (req, res) => {
  const id = req.params.id;
  const modified = req.body;
  if (id != null) {
    const product = await Product.findByIdAndUpdate(id, modified)
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(400).send({ error: err }));
  }
};

  exports.getBookmarkedProducts = async (req,res) => {
    try {
      const bookmarks = await Product.find({ productBookmarked: true });
      res.json(bookmarks);
      
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

  };
