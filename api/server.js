var restify  = require('restify');
var commands = require('./lib/command-service-adapter');

function getEnvironment() {
  if (process.argv.length > 2) {
    if (process.argv[1].match(/server\.js$/)) {
      return process.argv[2];
    }
  }
  return process.env.NODE_ENV || 'development';
}

var env = getEnvironment();
var config = require('./config/' + env);

var server = restify.createServer();

// command handler
server.post('/commands', commands.submit);

server.listen(config.web.port, function start() {
  console.log('%s (%s) listening at %s', server.name, env, server.url);
});
