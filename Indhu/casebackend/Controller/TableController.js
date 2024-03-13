const Tabledata=require("../Models/TableModel");

exports.getAllUProducts = async (req, res) => {
    try {
      const products = await Tabledata.find().sort({pname : 1});
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
exports.createProducts=async(req,res)=>{
    try{
    const {pname,pdescription,pprice}=req.body;
    console.log(pname)
    // console.log("NewUser"+newUser);
    let productexist= await Tabledata.findOne({pname})
    if (productexist){
        return res.status(400).send("Product already exists")
    }
    let newProduct=new Tabledata({
        pname,pdescription,pprice
    })
    newProduct.save();
    res.status(200).send("Product Created  successfully")
}catch(err){
    console.log(err)
    return res.status(500).send("Internal Server error")

}
   

}


exports.findProductByName = async (req, res) => {
    let getName = req.query.pname
    console.log(getName);
    let product = await Tabledata.find({ pname: getName })
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
