const express = require('express');
const app = express();
const mongoose = require('mongoose');

const RatingLocationsRoutes = express.Router();

// Require AdUnit model in our routes module
let Location = require('../models/Locations');

// Defined store route
RatingLocationsRoutes.route('/addRating/:locationId').post(function (req, res) {
  //  console.log(locationId)

  let rate = {
    userid: req.body.userid,
    username: req.body.username,
    Rate: req.body.Rate,
    created: Date.now

  }
  // console.log(req.body)
  let locationId = req.params.locationId;
  Location.findByIdAndUpdate(locationId, {
      "$push": {
        Rating: req.body
      }    },
    function (err, Location) {
      if (err) {
        console.log(err);
      } else {
        //do stuff
        //  console.log(doc);
        Location.CountRating=Location.CountRating+1;
        Location.RateAvg = (Location.RateAvg + req.body.Rate) / Location.Rating.length;
        //  Location=doc;
       // console.log(Location)
        Location.save().then(location => {

            res.json('Update complete');
          })
          .catch(err => {
              console.log(err);
            res.status(400).send("unable to update the database");
          });
      //  console.log('dd');
      }
    })
});

    RatingLocationsRoutes.route('/addComment/:locationId').post(function (req, res) {
        //  console.log(locationId)
      
        let comment = {
          userid: req.body.userid,
          username: req.body.username,
          comments: req.body.Comment,
          Approved:false
         // created: Date.now
      
        }
        // console.log(req.body)
        let locationId = req.params.locationId;
        Location.findByIdAndUpdate(locationId, {
            "$push": {
              comments: comment
            }    },
          function (err, Location) {
            if (err) {
              console.log(err);
            } else {
              //do stuff
              //  console.log(doc);
              Location.CountComments=Location.CountComments+1;
             // Location.RateAvg = (Location.RateAvg + req.body.Rate) / Location.Rating.length;
             // console.log((Location.RateAvg + req.body.Rate) / Location.Rating.length)
              //  Location=doc;
             // console.log(Location)
              Location.save().then(location => {
                  res.json('Update complete');
                })
                .catch(err => {
                    console.log(err);
                  res.status(400).send("unable to update the database");
                });
              //console.log('dd');
            }
          })


  /*function (err, Location) {

    if (!Location)
      return next(new Error('Could not load Document'));
    else {
      let rate = {
        userid: req.body.userid,
        username: req.body.username,
        Rate: req.body.Rate,
        created: Date.now

      }
      Location.Ratings.push(rate);

      Locations.RateAvg = (Locations.RateAvg + req.params.Rate) / Location.Ratings.length();

      Location.update().then(location => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });*/
});

// Defined get data(index or listing) route

RatingLocationsRoutes.route('/getComments').get(function (req, res) {
  //let areaId= req.params.areaId;
  Location.find(function (err, Location){
    if(err){
      console.log(err);
    }
    else {
     
      let comments=[];
      for(var i =0; i<Location.length;i++){
        if(Location[i].comments.length>0){
          for(var x=0 ; x<Location[i].comments.length;x++){
          //  console.log(x);
          var comment={
            LocationID:String,
            LocationAR_En:String,
            LocationComment:{}
                  }
            comment.LocationID= Location[i]._id;
            comment.LocationAR_En=Location[i].AR_name+Location[i].EN_name;
            comment.LocationComment=Location[i].comments[x];
            comments.push(comment)
          }
        }
      }
      res.json(comments);
    }
  });
});


// Defined edit route
RatingLocationsRoutes.route('/FlipApproval/:id').get(function (req, res) {
  const io = req.app.get('io');

  Location.findOne({"comments._id":req.params.id}, function (err, Location) {
//var a= Location.findOne({"comments._id":req.params.id})
//a.select('comments._id='+req.params.id)
//console.log(Location.comments.id(req.params.id));
    if(Location.comments.id(req.params.id).Approved){
      Location.comments.id(req.params.id).Approved=false;
   }else{

    Location.comments.id(req.params.id).Approved=true;
   }
   Location.save().then(location => {
    io.emit('flipped');

    res.json('Update complete');
  })
  .catch(err => {
      console.log(err);
    res.status(400).send("unable to update the database");
  });
   // res.json(Location);

  });
 /*  Location.findById(id, function (err, Location) {
    res.json(Location);
  }); */
});



module.exports = RatingLocationsRoutes;
