var db = require('../../../db');

var FamilyListQuery = module.exports = (function() {
  var execute = function(parameters, projection, callback) {
    callback(null, []);
  };

  return {
    model: 'family',
    name: '',
    execute: execute
  }
})();
