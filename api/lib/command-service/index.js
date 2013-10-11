var errors  = require('./errors');
var Command = require('../schema/command');

var CommandService = {
  submit: function(command, callback) {
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

    Command.create(cmd, function(err, doc) {
      if (err) return callback(err);
      return callback(null, doc._id);
    });
  },

  get: function(id, callback) {
    Command.findById(id, function(err, doc) {
      if (err) return callback(err);
      if (!doc) return callback(new errors.NotFoundError());
      return callback(null, doc.toObject());
    });
  },

  errors: errors
};

module.exports = CommandService;
