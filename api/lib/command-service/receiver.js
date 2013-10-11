var db      = require('../db');
var errors  = require('./errors');

var Receiver = module.exports = (function() {
  var submit = function(command, callback) {
    if (!command.command) {
      return callback(new errors.InvalidCommandError());
    }

    // strip off command name
    var name = command.command;
    delete command.command;

    // create command to save
    var cmd = {
      command: name,
      submittedAt: new Date(),
      submittedBy: 'unknown',
      payload: command
    };

    db.Command.create(cmd, function(err, doc) {
      if (err) return callback(err);
      return callback(null, doc._id);
    });
  };

  return {
    submit: submit
  };
})();
