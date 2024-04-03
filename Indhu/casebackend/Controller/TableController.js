const Tabledata=require("../Models/TableModel");

exports.getAllUProducts = async (req, res) => {
    try {
      const products = await Tabledata.find().sort({name : 1});
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


exports.createProducts = async (req, res) => {
    const NewProduct = req.body;
 
    if (NewProduct != null) {
        // console.log(NewProduct);
        const oldproduct = await Tabledata.findOne({ name: NewProduct.name })
       
        if (oldproduct) {
            return res.status(400).send(`Product already exists`)
        }
 
        await Tabledata.create(NewProduct)
            .then((data) =>{console.log("Data inside the creation"+ data)
            res.status(201)
                .send("Product created successfully")})
            .catch((err) => {
                res.status(400).send({ error: err })
            })
 
    }
    else {
        res.status(400).send("Product not created")
    }
 
}



exports.getProductById = async (req, res) => {
    const productId = req.params.productId; // Assuming the product ID is passed as a route parameter

    try {
        // Find the product by ID
        const product = await Tabledata.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (err) {
        console.error('Error fetching product details:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



exports.findProductByName = async (req, res) => {
    let getName = req.query.name
    console.log(getName);
    let product = await Tabledata.find({ name: getName })
    console.log("Product " + product);
    if (product.length <= 0) {
        res.status(404).send("No product found")
    }
    else if (product !== null) {
        res.status(200).json(product)
    }
    else {
        res.status(400);
    }
}
exports.deleteProductById = async (req, res) => {
    const productId = req.params.productId;
    // console.log(productId)

    try {
        // Check if the product exists
        const product = await Tabledata.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // If the product exists, delete it
        await Tabledata.findByIdAndDelete(productId);
        
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateProductById = (req, res) => {
    const id = req.params.id;
    const updateValue = req.body;
    Tabledata.findByIdAndUpdate(id, updateValue)
        .then((data) => {
            if (!data) {
                return res.status(400).send("Product Not Found");
            }
            return res.status(200).send("Updated Successfully");
        })
        .catch((err) => {
            console.error("Update error:", err);
            res.status(400).send("Bad Request" + err);
        });
};

