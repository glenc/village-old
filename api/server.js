var api = require('./lib/api-server');

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

var server = api.createServer(config);
server.listen(config.web.port, function start() {
  console.log('%s (%s) listening at %s', server.name, env, server.url);
});
