const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// Route to create a new offer
router.post('/offers', offerController.createOffer);

// Route to get all offers
router.get('/offers', offerController.getAllOffers);

module.exports = router;
