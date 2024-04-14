const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  offername: {
    type: String,
    required: true
  },

  offercode: {
    type: String,
    required: true
  },

  startdate: {
    type: String,
  },

  enddate: {
    type: String
  }
  
});

module.exports = mongoose.model('Offer', offerSchema);
