module.exports = function(DBClient) {

  var http = require('http');
  var express = require('express');
  var bodyParser = require('body-parser');
  var routes = require('./routes')(DBClient);
  var app = express();

  app.use(routes.logRequest);
  app.use(bodyParser.json());

  app.post('/stock', routes.insertStock);
  app.get('/stock/:isbn', routes.findStock);
  app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });


  app.use(routes.clientError);
  app.use(routes.serverError);

  var port = process.env.APP_PORT || 3000;

  var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });

  return app;
}
