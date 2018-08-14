const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let LocationsCategories = new Schema({
    AR_name: {
        type: String
      },
      EN_name: {
        type: String
      },
},{
    collection: 'locationCategories'
});

module.exports = mongoose.model('LocationsCategories', LocationsCategories);