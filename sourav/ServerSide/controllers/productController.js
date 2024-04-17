//import the model
const productModel = require("../models/productModel");
const Products = require("../models/productModel");
const userModel = require("../models/userModel");


//Define Route handler
exports.createProduct = async (req, res) => {
    const NewProduct = req.body;

    if (NewProduct != null) {
        // console.log(NewProduct);
        const oldproduct = await Products.findOne({ name: NewProduct.name })
        
        if (oldproduct) {
            return res.status(400).send(`Product already exists`)
        }

        await Products.create(NewProduct)
            .then((data) =>{console.log("Data inside the creation"+ data)
            res.status(201)
                .send("Product created successfully")})
            .catch((err) => {
                res.status(400).send({ error: err })
            })



        // const product = new Products(NewProduct);
        // try {
        //     await product.save(); // mongodb: { ..., firstName_fuzzy: [String], lastName_fuzzy: [String] }
        //     res.status(200).send("Product created successfully")
        // }
        // catch (e) {
        //     res.status(400).send({ error: e })
        // }


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

//Update the product by id
exports.updateProductById = async (req, res) => {
    const id = req.params.id;
    const modifiedValue = req.body;
    Products.findByIdAndUpdate(id, modifiedValue)
        .then((data) => res.status(204).send(data))
        .catch((err) => res.status(404).send(err => "Item not found" + err))
}



exports.getProduct = async (req, res) => {
    // Products.find()
    const { q } = req.query;
    Products.find({
        $or: [
            { category: { $regex: new RegExp(q, 'i') } },
            { name: { $regex: new RegExp(q, 'i') } }
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
//Delete all the product
exports.DeleteAllProduct = (req, res) => {
    Products.deleteMany({}).then(() => res.status(201).send("Deleted all data sucessfuly"))
        .catch(err => res.status(404).send(err => "Delete Failed" + err))

}


//Update the bookmark
exports.UpdateBookmark = (req, res) => {
    const id = req.params.id;
    const bookmarkState = req.body.bookmark;
    console.log(bookmarkState)
    if (id != null) {
        Products.findByIdAndUpdate(id, { bookmark: bookmarkState })
            .then(() => res.status(201).send("Updated sucessfuly"))
            .catch((err) => res.status(400).send(err => "id not found" + err));;
    }
    else {
        res.status(401).send(`Product with id ${id} does not exist`);
    }

}

//GET THE the bookmark BY bookmark
exports.getProductByBookmark = (req, res) => {
    // Products.find({ bookmark: true })
    //     .then((data) => res.status(201).json(data).send(" sucessfuly product fetched"))
    //     .catch((err) => res.status(400).send(err => "not found" + err));;


    const { q } = req.query;
    Products.find({
        $or: [
            { category: { $regex: new RegExp(q, 'i') } },
            { name: { $regex: new RegExp(q, 'i') } }
        ], bookmark: true
    })
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })


} 


//GET THE the user specific wishlist
exports.getProductByWishlist = async (req, res) => {

    //  const  data  = req.body;
     const  userId  = req.params.wishlist;

     console.log("User id is: ",userId);
     const {q} = req.query;
     console.log(q);
    
    try {
       
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const wishlist = user.wishlist;

        
        try {

            const matchingData = await productModel.find({ _id: { $in: wishlist }, $or: [
                { category: { $regex: new RegExp(q, 'i') } },
                { name: { $regex: new RegExp(q, 'i') } }
            ] });

            res.status(200).json({ matchingData: matchingData });
        } catch (error) {
            console.error("Error finding matching data:", error);
            res.status(500).json({ message: "Failed to find matching data" });
        }
    } catch (error) {
        console.error("Error finding wishlist:", error);
        return res.status(500).json({ message: "Failed to find wishlist" });
    }

} 
// exports.getProductByWishlist = async (req, res) => {

//      const  userId  = req.body.userId;
    
//     try {
       
//         const user = await userModel.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         const wishlist = user.wishlist;

        
//         try {

//             const matchingData = await productModel.find({ _id: { $in: wishlist } });
//             res.status(200).json({ matchingData: matchingData });
//         } catch (error) {
//             console.error("Error finding matching data:", error);
//             res.status(500).json({ message: "Failed to find matching data" });
//         }
//     } catch (error) {
//         console.error("Error finding wishlist:", error);
//         return res.status(500).json({ message: "Failed to find wishlist" });
//     }

// } 
