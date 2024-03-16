const express=require("express");
const OffersRouter=express.Router();
const OffersContoller=require("../Controller/OffersController");

//create a offers
OffersRouter.post("/create",OffersContoller.createOffersforusers);
OffersRouter.post("/sendmail",OffersContoller.sendEmail);
OffersRouter.get("/all",OffersContoller.getAllOffers);
OffersRouter.get("/id/:id",OffersContoller.getOfferById);

module.exports=OffersRouter


 
 
