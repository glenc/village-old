var _  = require('underscore');
var db = require('../../../db');

var ActiveQuery = module.exports = (function() {
  var execute = function(parameters, projection, callback) {
    var select = projection.select || '';
    var params = { status: 'Active' };
    _.defaults(params, parameters); // merge other parameters passed

    db.Family.find(params, select, callback);
  };

  return {
    model: 'family',
    name: '',
    execute: execute
  }
})();
