var express = require('express');
var router = express.Router();

// Access to real DB
var db = require('../db-setup.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  // Rendering the index view with the title 'Sign Up'
  res.render('index', { title: 'inTouch'});

});

router.get('/status', function (req, res, next) {

  //Rendering view of place to update status
  res.render('status');
});
router.get('/profile', function (req, res, next) {
  var moodlist = [];
  db.moods.find({}).toArray(function (err, allMoods) {
    allMoods.forEach(function (mood) {
      moodlist.push({mood: mood.mood})
    });
  });
  res.render('profile', {moods:moodlist});
});
 
router.get('/friends', function (req, res, next) {
  var friendsList = [{friend_name:"Jordan"},{friend_name:"Josh"},{friend_name:"Connie"},{friend_name:"Connie2"}]

  // Rendering the index view with the title 'Sign Up'
  res.render('friends',{friends:friendsList});
  
});


router.get('/messages', function (req, res, next) {

  
  // Rendering the index view with the title 'Sign Up'
  res.render('messages');
  
});


router.post('/submitmood', function (req, res, next) {

  // Catching variables passed in the form
  var mood = req.body.mood;
  db.moods.insert({
    mood: mood
  }, function (err, result){
    res.redirect("/profile");
  })

});

router.post('/addfriend', function (req, res, next) {

  // Catching variables passed in the form
  var mood = req.body.mood;
  db.moods.insert({
    mood: mood
  }, function (err, result){
    res.redirect("/friends");
  })

});

router.post('/signup', function (req, res, next) {
  var userName = req.body.username;
  var userPwd = req.body.password;
  db.users.find({username: userName}).toArray(function (err, result) {
    if (result.length <= 0) {
      db.users.insert({username: userName, pwd: userPwd}, function (err, result) {
        var user = db.users.findOne({username: userName});
//        req.session.username = userName;
        res.send({success: "success"});
      });
    } else {
      res.send({error: "error"});
    }
  });
});

router.post('/signin', function (req, res, next) {
  console.log("inside index.js");
  var userName = req.body.username;
  var userPwd = req.body.password;
  db.users.find({username: userName, pwd: userPwd}).toArray(function (err, result) {
    if (result.length > 0) {
      var user = result[0];
      console.log("user is " + user.username);
//      req.session.username = user.username
      res.send({success: "success"});
    } else {
      console.log("error sent from server");
      res.send({error: "error"});
    }
  });
});



module.exports = router;
