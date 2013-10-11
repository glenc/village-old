var async   = require('async');
var cs      = require('../command-service');
var errors  = require('./errors');

var CommandServiceAdapter = module.exports = (function() {
  var mapError = function(err) {
    if (err instanceof cs.errors.InvalidCommandError) {
      return new errors.BadRequestError('Invalid command');
    }
    return err;
  };

  var response = function(res, next) {
    return function(err, code, data) {
      if (err) {
        return next(mapError(err));
      }
      res.send(code, data);
      return next();
    };
  };

  var submit = function(req, res, next) {
    async.waterfall([
        function(cb)      { cs.submit(req.body, cb); },
        function(id, cb)  { cb(null, 202, { id: id }); }
      ],
      new response(res, next)
    );
  };

  var get = function(req, res, next) {
    async.waterfall([
      function(cb) { cs.get(req.params.id, cb); },
      function(cmd, cb) { cb(null, 200, cmd); }
      ],
      new response(res, next)
    );
  };

  return {
    submit: submit,
    get: get
  };

})();
