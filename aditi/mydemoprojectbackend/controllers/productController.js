const Product = require("../Models/productModel");

//add product in database
exports.addProduct = async (req, res) => {
  const newProduct = req.body;
  if (newProduct != null) {
    try {
      const product1 = await Product.findOne({ productName: newProduct.productName });
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
