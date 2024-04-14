const Offer = require('../models/offerModel');

// Controller to create a new offer
const createOffer = async (req, res) => {
    try {
        const { offername, offercode, startdate, enddate } = req.body;
        const newOffer = new Offer({ offername, offercode, startdate, enddate });
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller to get all offers
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find();
        res.json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOffer, getAllOffers };
