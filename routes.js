module.exports = function(DBClient){

  var dbConnection = DBClient.connect();

  var insertStock = function(req, res) {

      var obj = {
       "isbn"  : req.body.isbn,
       "count" : req.body.count
      };

      console.log("Inserting object");
      console.log(obj);

      dbConnection.then(function(db) {
          return DBClient.insertStock(db, obj);
      })
      .then(res.json(obj))
      .catch(function(err){
        console.log("Error " + err);
      });
  }

  function findStock(req, res) {
    var isbn = req.params.isbn;
    console.log("Searching ISBN: " + isbn);
    dbConnection.then(function(db) {
      return DBClient.findStockByIsbn(db, isbn);
    }).then(function(data) {
      res.send(data);
    });
  }

  function clientError(req, res, next) {
    var err = new Error("Not found");
    err.status = 404;
    next(err);
  }

  function serverError(err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: (process.env.NODE_ENV === 'production') ? {} : err
    });
  }

  function logRequest(req,res,next){
    console.log('New reuquest logged' + new Date());
    next();
  }

  return {
    logRequest: logRequest,
    insertStock : insertStock,
    findStock : findStock,
    clientError: clientError,
    serverError: serverError
  }
}
