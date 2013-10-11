var errors = require('./errors');

var CommandService = {
  submit: function(command, callback) {
    if (!command.command) {
      return callback(new errors.InvalidCommandError());
    }

    return callback(null, 123);
  },

  get: function(id, callback) {
    return callback(null, { id:id });
  },

  errors: errors
};

module.exports = CommandService;
