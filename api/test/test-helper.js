var async = require('async');
var db    = require('../lib/db');

module.exports.responseParser = function(callback) {
  return function(err, req, res, data) {
    var obj = {
      err: err,
      req: req,
      res: res,
      data: data
    };
    callback(null, obj);
  };
};

module.exports.resetDb = function(callback) {
  var models = Object.keys(db);
  async.each(
    models,
    function(model, cb) {
      db[model].remove({}, cb);
    },
    callback
  );
}
