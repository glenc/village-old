var cs      = require('../command-service');
var errors  = require('./errors');

var CommandServiceAdapter = {
  submit: function(req, res, next) {
    var response = function(err, id) {
      if (err) {
        if (err instanceof cs.errors.InvalidCommandError) {
          return next(new errors.BadRequestError('Invalid command'));
        } else {
          return next(err);
        }
      }

      // no error, all good
      res.send(202, { id: id });
      return next();
    };

    cs.submit(req.body, response);
  }
};

module.exports = CommandServiceAdapter;
