//import the model
const Products = require("../models/productModel");


//Define Route handler

exports.createProduct = async (req, res) => {
    const NewProduct = req.body;
    if (NewProduct != null) {

        const oldproduct = await Products.findOne({ ProductName: NewProduct.ProductName })

        if (oldproduct) {
            return res.status(400).send(`Product already exists`)
        }
        // const product = new Products(NewProduct);
        // try {
        //     await product.save(); // mongodb: { ..., firstName_fuzzy: [String], lastName_fuzzy: [String] }
        //     res.status(200).send("Product created successfully")
        // }
        // catch (e) {
        //     res.status(400).send({ error: e })
        // }

        Products.create(NewProduct)
            .then((data) => res.status(200)
                .send("Product created successfully"))
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(400).send("Product not created")
    }

}


//get all the product
// exports.getProduct = async (req, res) => {
//     // Products.find()
//     const { q } = req.query;
//     Products.fuzzySearch(q)
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch((err) => {
//             res.status(400).send({ error: err })
//         })
// }

exports.getProduct = async (req, res) => {
    // Products.find()
    const { q } = req.query;
    Products.find({
        $or: [
            { category: { $regex: new RegExp(q, 'i') } },
            { ProductName: { $regex: new RegExp(q, 'i') } }
        ]
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}



//get the product by id
exports.getProductById = async (req, res) => {
    const id = req.params.id;
    if (id != null) {

        Products.findById(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
        // Products.fuzzySearch(id)
        //     .then((data) => {
        //         res.status(200).json(data);
        //     })
        //     .catch((err) => {
        //         res.status(400).send({ error: err })
        //     })
    }
    else {
        res.status(401).send(`Product with id ${id} does not exist`);
    }
}

//Delete the product by id
exports.DeleteProduct = (req, res) => {
    const id = req.params.id;
    Products.findByIdAndDelete(id).then(() => res.status(201).send("deleted sucessfuly"))
        .catch(err => res.status(404).send(err => "id not found" + err))

}