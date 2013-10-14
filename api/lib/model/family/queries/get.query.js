var _  = require('underscore');
var db = require('../../../db');

var GetQuery = module.exports = (function() {
  var execute = function(id, projection, callback) {
    db.Family.findById(id, function(err, doc) {
      if (err) return callback(err);
      var obj = doc.toObject();
      if (projection && projection.map) {
        obj = projection.map(obj);
      }
      return callback(null, obj);
    });
  };

  return {
    model: 'family',
    name: 'get',
    execute: execute
  }
})();
