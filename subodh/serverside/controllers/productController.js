const Products = require("../models/productModel");

// Get all products
exports.getProduct = (req, res) => {
    // req is 
    // const book = req.params.bookmarked
    // if (book === true) {

    // }
    Products.find()
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).send(error)
        })
}

// Add a product
exports.addProduct = (req, res) => {
    const NewProduct = req.body;
    if (NewProduct != null) {
        Products.create(NewProduct)
            .then((response) => {
                res.status(201).send(response)
            })
            .catch((error) => {
                console.log(error);
                res.status(400).send(error)
            })

    } else {
        res.status(400).send(`Empty data cannot be added`)
    }
}

// updating product
exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const modifiedData = req.body;
    console.log(id, modifiedData)
    Products.findByIdAndUpdate(id, modifiedData)
        .then((data) => res.status(201).send(`Product updated successfully: ${id}`))
        .catch((err) => res.status(404).send(err => "Item not found" + err))
}

// fetch bookmarked products
exports.getBookmarks = (req, res) => {
    Products.find({ bookmarked: true })
        .then((response) => {
            res.status(200).json(response);
        })
        .catch((error) => {
            res.status(400).send(error)
        })
}

// fetch product by id
exports.getProductById = (req, res) => {
    const id = req.params.id;
    Products.findById(id)
        .then((data) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })
}