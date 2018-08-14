const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for AdUnits
let Locations = new Schema({
  AreaId: {
    type: String
  },
  AR_name: {
    type: String
  },
  EN_name: {
    type: String
  },
  Lat: {
    type: String
  },
  Lng: {
    type: String
  },
  AR_desc: {
    type: String
  },
  EN_desc: {
    type: String
  },
  Image: {
    type: String
  },
  CategoriesId: {
    type: String
  },
  RateAvg: {
    type: Number,
    default: 0

  },
  CountRating:{
    type:Number,
    default:0
  },
  CountComments:{
    type:Number,
    default:0
  },
  created: {
    type: Date,
    default: Date.now
  },
  Rating: [{
    userid: {
      type: String
    },
    username:{
      type:String
    },
    Rate: {
      type: Number
    }, created: {
      type: Date,
      default: Date.now
    }
  }],
  comments:[{
    userid: {
      type: String
    },
    username:{
      type:String
    },
    
    comments: {
      type: String
    },
    Approved:{
      type:Boolean,
      default:false
    },
    created: {
      type: Date,
      default: Date.now
    }
  }]



}, {
  collection: 'location'
});

module.exports = mongoose.model('Locations', Locations);
