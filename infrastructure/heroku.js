var heroin = require('heroin-js');
var _ = require('lodash');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

// configurator.export('bookinventorystp').then(function(result) {
// 	console.log(result);
// });

var configuration = _.merge({}, require('./base'), {
    name: 'bookinventorystptest',
    config_vars: { DB_URL: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj'},
    domains: [ 'bookinventorystptest.herokuapp.com' ]
  });

console.log(configuration);
configurator(configuration);
