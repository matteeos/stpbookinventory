var heroin = require('heroin-js');
var _ = require('lodash');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

// configurator.export('bookinventorystp').then(function(result) {
// 	console.log(result);
// });

var configuration = _.merge({}, require('./base'), {
    name: 'bookinventorystptest'
  });

console.log(configuration);
configurator(configuration);
