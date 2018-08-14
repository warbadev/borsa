const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Images= new Schema({
  image1:String,image2:String,image3:String,image4:String,image5:String}
)
// Define collection and schema for AdUnits
let Areas = new Schema({
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
      Image:{
        type:Images
      },
      

      
},{
    collection: 'areas'
});

module.exports = mongoose.model('Areas', Areas);