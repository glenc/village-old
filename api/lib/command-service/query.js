var db      = require('../db');
var errors  = require('./errors');

var Query = module.exports = (function() {
  var get = function(id, callback) {
    db.Command.findById(id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new errors.NotFoundError());
      return callback(null, doc.toObject());
    });
  };

  return {
    get: get
  };
})();
