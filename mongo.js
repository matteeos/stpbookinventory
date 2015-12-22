var MongoClient = require('mongodb').MongoClient

exports.connect = function() {
  // Connection URL
  var url = 'mongodb://localhost:27017/myproject';
  return MongoClient.connect(url);
}

exports.close = function(db) {
  if (db) {
    db.close(function(err, result) {
      db = null
      mode = null
      done(err)
    })
  }
}

exports.insertStock = function(db, data) {
  var collection = db.collection('books');
  collection.updateOne( {'isbn': data.isbn}, data, { upsert: true}).then(function(data) {
    return data;
  });
}

exports.findAll = function(db, callback) {
  var collection = db.collection('books');
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.dir(docs)
    callback(docs);
  });
}

exports.findStockByIsbn = function(db, id) {
  var collection = db.collection('books');
  return collection.findOne( { "isbn": id }).then(function(data) {
    return data;
  });
}
