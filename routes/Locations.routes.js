
const express = require('express');
const app = express();
const LocationsRoutes = express.Router();

// Require AdUnit model in our routes module
let Location = require('../models/Locations');

// Defined store route
LocationsRoutes.route('/add').post(function (req, res) {
  let location = new Location(req.body);
  location.save()
    .then(game => {
    res.status(200).json({'location': 'location in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
LocationsRoutes.route('/get/:areaId').get(function (req, res) {
  let areaId= req.params.areaId;
  Location.find({AreaId:areaId},function (err, Location){
    if(err){
      console.log(err);
    }
    else {
      res.json(Location);
    }
  });
});
LocationsRoutes.route('/getAll/').get(function (req, res) {
  //let areaId= req.params.areaId;
  Location.find(function (err, Location){
    if(err){
      console.log(err);
    }
    else {
      res.json(Location);
    }
  });
});
// Defined edit route
LocationsRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Location.findById(id, function (err, Location){
      res.json(Location);
  });
});

//  Defined update route
LocationsRoutes.route('/update/:id').post(function (req, res) {
  Location.findById(req.params.id, function(err, Location) {
    if (!Location)
      return next(new Error('Could not load Document'));
    else {
      console.log(req.body.AR_name);
      
      Location.AreaId = req.body.AreaId;
      Location.AR_name = req.body.AR_name;
      Location.EN_name = req.body.EN_name;
      Location.EN_desc = req.body.EN_desc;
      Location.AR_desc = req.body.AR_desc;
      Location.Lat = req.body.Lat;
      Location.Lng = req.body.Lng;
      Location.Image=req.body.Image;
      Location.CategoriesId=req.body.CategoriesId;
      

      Location.save().then(location => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
LocationsRoutes.route('/delete/:id').get(function (req, res) {
  //onsole.log('d');
  Location.findByIdAndRemove({_id: req.params.id}, function(err, Location){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = LocationsRoutes;