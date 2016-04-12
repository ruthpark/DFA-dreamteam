var mongo = require('mongodb').MongoClient;

var dbConnectionUrl = process.env.MONGOLAB_URI||'mongodb://localhost:27017/dreamteam';

var collections = {};
//connect to mongodb on herokuapp
collections._store = new MongoStore({url: dbConnectionUrl});
collections.ObjectID = mongodb.ObjectID;

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
