var restify = require('restify');
var csa     = require('./lib/command-service-adapter');

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

var server = restify.createServer({
  name: 'village-api',
  version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

// command handler
server.post('/commands', csa.submit);
server.get ('/commands/:id', csa.get);

server.listen(config.web.port, function start() {
  console.log('%s (%s) listening at %s', server.name, env, server.url);
});
