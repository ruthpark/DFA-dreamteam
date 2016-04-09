var express = require('express');
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

  // Rendering the index view with the title 'Sign Up'
  res.render('profile');

});
router.get('/friends', function (req, res, next) {

  // Rendering the index view with the title 'Sign Up'
  res.render('friends');
  
});

router.get('/messages', function (req, res, next) {

  // Rendering the index view with the title 'Sign Up'
  res.render('messages');
  
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

/* POST to adduser */
router.post('/adduser', function (req, res, next) {

  // Catching variables passed in the form
  var userName = req.body.username;
  var passWord = req.body.password;

  // Adding the new entry to the db
  // TODO: insert the new document into collection
  //   db.people.insert({ ... });
  //      ... or ...
  // update the existing one!
  //   db.people.update({ _id: ... }, { $set: {...} })
  // How would you do this?

  db.people.find({_id: userName}).toArray(function (err, peeps) {
    if (peeps.length > 0) {
      // the user needs to be updated
      db.people.update({_id: userName}, {$set: {password: passWord}}, function (err) {
        // Redirecting back to the root
        res.redirect('/');
      });
    } else {
      db.people.insert({_id: userName, password: passWord}, function (err) {
        // Redirecting back to the root
        res.redirect('/');
      });
    }
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
