const Offers = require("../models/offersModel");


exports.createOffers = async (req, res) => {
    const NewOffers = req.body;

    if (NewOffers != null) {
        // console.log(NewProduct);
        await Offers.create(NewOffers)
            .then((data) => {
                console.log("Data inside the creation" + data)
                res.status(201)
                    .send("Offers created successfully")
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(400).send("Offers not created")
    }
}


//get offers by Id
exports.getOffersById = async (req, res) => {
    const id = req.params.id;
    if (id != null) {

        Offers.findById(id)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(400).send({ error: err })
            })
    }
    else {
        res.status(401).send(`Offers with id ${id} does not exist`);
    }
}


//get all offers
exports.getAllOffers = async (req, res) => {
    Offers.find()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).send({ error: err })
        })
}
