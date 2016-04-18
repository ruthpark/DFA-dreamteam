var express = require('express');
var session = require('express-session');
var router = express.Router();

// Access to real DB
var db = require('../db-setup.js');

/* GET home page. */
router.get('/', function (req, res, next) {

  // Rendering the index view with the title 'Sign Up'
  res.render('index', { title: 'Sign Up'});

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

  // Rendering the index view with the title 'Sign Up'
  res.render('friends');
  
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


/* GET userlist JSON */
router.get('/userlist', function (req, res, next) {
  // TODO: query database db.people.find(...) and return the result
  // res.send({...});
  db.people.find({}).toArray(function (err, peeps) {
    var jsonReturn = {};
    peeps.forEach(function (person) {
      jsonReturn[person._id] = person.fruit;
    });
    res.send(jsonReturn);
  });
});



/* POST to deleteuser */
router.post('/deleteuser', function (req, res, next) {

  // Catching variables passed in the form
  var userName = req.body.username;

  // Checking whether user is in db
  // TODO: check if the user is in db with db.people.find(...),
  // TODO: and then remove it if it exists db.people.remove(...)
  // TODO: or return an error
  db.people.find({_id: userName}).toArray(function (err, peeps) {
    if (peeps.length > 0) {
      db.people.remove({_id: userName}, function (err) {
        res.redirect('/');
      });
    } else {
      var errMsg = {message: 'User not found'};
      res.render('error', errMsg);
    }
  });
});

router.get('/findfruit', function (req, res, next) {
  var userName = req.query.username;

  db.people.find({_id: userName}, function (err, peeps) {
    if (peeps.length > 0) {
      res.send(peeps[0].password);
    } else {
      var errMsg = {message: 'User not found'};
      res.render('error', errMsg);
    }
  });
});

module.exports = router;
