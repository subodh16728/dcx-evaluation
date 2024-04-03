const express = require("express");
const offerRouter = express.Router();
const offerController = require("../controllers/offerController");

offerRouter.post("/",offerController.addOffer);
offerRouter.get("/",offerController.getOffers);
offerRouter.get("/:id",offerController.getofferById);

module.exports = offerRouter;