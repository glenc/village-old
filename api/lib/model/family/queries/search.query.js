var db = require('../../../db');

var SearchQuery = module.exports = (function() {
  var execute = function(parameters, projection, callback) {
    var select = projection.select || '';

    db.Family.find(parameters, select, callback);
  };

  return {
    model: 'family',
    name: 'search',
    execute: execute
  }
})();
