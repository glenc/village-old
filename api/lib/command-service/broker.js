var errors = require('./errors');

var Broker = module.exports = (function() {
  var handlers = {};

  var registerHandler = function(command, handler) {
    handlers[command] = handler;
  };

  var send = function(command, payload, callback) {
    var handler = handlers[command];
    if (handler) {
      handler(payload, callback);
    } else {
      callback(new errors.UnknownCommandError());
    }
  };

  return {
    registerHandler: registerHandler,
    send: send
  };
})();
