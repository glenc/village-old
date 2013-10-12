var db = require('../../../db');

var ActiveFamiliesQuery = module.exports = (function() {
  var execute = function(parameters, projection, callback) {
    callback(null, [{one:1}]);
  };

  return {
    model: 'family',
    name: 'active',
    execute: execute
  }
})();
