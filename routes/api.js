var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../CONFIG/FB');
require('../CONFIG/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});
router.post('/signup', function(req, res) {

  if (!req.body.email || !req.body.password || !req.body.fullName) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      fullName: req.body.fullName
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      User.findOne({
        username: req.body.username
      }, function(err, user) {
        
      var token = jwt.sign(user.toJSON(), config.secret);
      res.json({success: true, msg: 'Successful created new user.', token: 'JWT ' + token,});
     })
     });
  }
});
router.delete('/logout', function (req, res) {
  return res.json({
    data: {
      message: 'Successfully logged out!'
    }
  });
});
router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
module.exports = router;