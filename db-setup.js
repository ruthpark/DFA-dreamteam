var mongo = require('mongodb').MongoClient;

var dbConnectionUrl = 'mongodb://localhost:27017/dreamteam';

var collections = {};

mongo.connect(dbConnectionUrl, function (err, db) {
  if (err) {
    console.log('Can not connect to MongoDB. Did you run it?');
    console.log(err.message);
    return;
  }

  collections.users = db.collection('users');
  collections.friends = db.collection('friends');
  collections.moods = db.collection('moods');
  collections.messages = db.collection('messages');
});


module.exports = collections;
