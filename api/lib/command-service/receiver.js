var async   = require('async');
var db      = require('../db');
var errors  = require('./errors');
var broker  = require('./broker');

var Receiver = module.exports = (function() {

  var sendToHandler = function(name, body, callback) {
    broker.send(name, body, callback);
  };

  var resolveCommand = function(id, err, result) {
    var update = {
      $set: {
        error: err,
        result: result,
        completedAt: new Date()
      }
    };

    var tries = 0;
    var success = false;
    async.whilst(
      function() { return !success && tries <= 100; },
      function(cb) {
        tries++;
        db.Command.findByIdAndUpdate(id, update, function(err, result) {
          if (err || result) {
            success = true;
          }
        })
        setTimeout(cb, 10);
      },
      function(err) { }
    );
  };


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
      body: command
    };

    // save to db
    var id;
    db.Command.create(cmd, function(err, doc) {
      if (err) return callback(err);
      id = doc.id;
      callback(null, doc.id); // call back to client before moving on
    });

    // handle the command and update the db
    sendToHandler(name, command, function(err, result) {
      // not sure about this - why do we have to timeout before moving on?
      setTimeout(function() { resolveCommand(id, err, result); }, 10);
    });

  };

  return {
    submit: submit
  };
})();
