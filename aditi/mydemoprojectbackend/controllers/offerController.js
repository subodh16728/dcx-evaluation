const Offer = require("../Models/OfferModel");

exports.addOffer = async (req,res) => {
    const newOffer = new Offer(req.body);
    if (newOffer != null) {
        try {
          const offer = await Offer.findOne({
            tittle: newOffer.tittle,
          });
          if (offer) {
            return res.status(400).send("Offer Already Exists");
          }
    
          await Offer.create(newOffer);
          res.status(201).send("Offer Added successfully");
        } catch (err) {
          res.status(400).send({ error: err.message });
        }
      } else {
        res.status(400).send("New Offer details not received");
      }
};

exports.getOffers = (req,res) => {
    Offer.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(400).send({ error: err }));
};

exports.getofferById = (req,res) => {
    const id = req.params.id;
    if(id != null){
        Offer.findById(id)
            .then((data) =>{
                res.status(200).json(data);
            })
            .catch((err) => {
                res.status(400).send({error:err})
            });
    } else {
        res.status(401).send(`Offer with id ${id} does not exist`)
    }
};