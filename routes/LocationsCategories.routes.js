
const express = require('express');
const app = express();
const LocationsCategoriesRoutes = express.Router();

// Require AdUnit model in our routes module
let LocationCategories = require('../models/LocationsCategories');

// Defined store route
LocationsCategoriesRoutes.route('/add').post(function (req, res) {
  console.log(req.body)
  let locationCategories = new LocationCategories(req.body);
  locationCategories.save()
    .then(game => {
    res.status(200).json({'locationCategories': 'locationCategories in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
LocationsCategoriesRoutes.route('/').get(function (req, res) {
  console.log('ds');
  LocationCategories.find(function (err, LocationCategories){
    if(err){
      console.log(err);
    }
    else {
      res.json(LocationCategories);
    }
  });
});

// Defined edit route
LocationsCategoriesRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  LocationCategories.findById(id, function (err, LocationCategories){
      res.json(LocationCategories);
  });
});

//  Defined update route
LocationsCategoriesRoutes.route('/update/:id').post(function (req, res) {
  LocationCategories.findById(req.params.id, function(err, LocationCategories) {
    if (!LocationCategories)
      return next(new Error('Could not load Document'));
    else {
     // console.log(req.body.AR_name);
      
      LocationCategories.AR_name = req.body.AR_name;
      LocationCategories.EN_name = req.body.EN_name;
     

      

      LocationCategories.save().then(locationCategories => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
LocationsCategoriesRoutes.route('/delete/:id').get(function (req, res) {
  //onsole.log('d');
  LocationCategories.findByIdAndRemove({_id: req.params.id}, function(err, LocationCategories){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = LocationsCategoriesRoutes;