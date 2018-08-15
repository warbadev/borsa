
const express = require('express');
const app = express();
const AreasRoutes = express.Router();

// Require AdUnit model in our routes module
let Area = require('../models/areas');

// Defined store route
AreasRoutes.route('/add').post(function (req, res) {
  let area = new Area(req.body);
  area.save()
    .then(game => {
    res.status(200).json({'Area': 'area in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
AreasRoutes.route('/').get(function (req, res) {
    Area.find(function (err, Area){
    if(err){
      console.log(err);
    }
    else {
      res.json(Area);
    }
  });
});

// Defined edit route
AreasRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Area.findById(id, function (err, Area){
      res.json(Area);
  });
});

//  Defined update route
AreasRoutes.route('/update/:id').post(function (req, res) {
    Area.findById(req.params.id, function(err, Area) {
    if (!Area)
      return next(new Error('Could not load Document'));
    else {
      console.log(req.body.AR_name);
        Area.AR_name = req.body.AR_name;
        Area.EN_name = req.body.EN_name;
        Area.EN_desc = req.body.EN_desc;
        Area.AR_desc = req.body.AR_desc;
        Area.Lat = req.body.Lat;
        Area.Lng = req.body.Lng;
        Area.Image=req.body.Image;

      

        Area.save().then(Area => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
AreasRoutes.route('/delete/:id').get(function (req, res) {
  //onsole.log('d');
    Area.findByIdAndRemove({_id: req.params.id}, function(err, Area){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = AreasRoutes;