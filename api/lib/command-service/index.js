var errors = require('./errors');

var CommandService = {
  submit: function(command, callback) {
    console.log(command);
    //if (!command.command) {
    //  console.log('here');
    //  return callback(new errors.InvalidCommandError());
    //}

    return callback(null, 123);
  },

  errors: errors
};

module.exports = CommandService;
