var MongoClient = require('mongodb').MongoClient;

var stock = [];

exports.connect = function() {
  return Promise.resolve();
}

exports.insertStock = function(db, data) {
  stock.push(data);
  return data;
}

exports.findStockByIsbn = function(db, id) {
  var result = {};
  stock.forEach(function(it){
    if(it.isbn == id){
      result = it;
    }
  });

  return result;
}
