var restify     = require('restify');
var mongoose    = require('mongoose');
var commandApi  = require('./command-api');

var createServer = module.exports.createServer = function(config) {
  // init server
  var server = restify.createServer({
    name: 'village-api',
    version: '1.0.0'
  });

  // plugins
  server.use(restify.acceptParser(server.acceptable));
  server.use(restify.queryParser());
  server.use(restify.bodyParser());
  server.use(restify.gzipResponse());

  // connect to db
  mongoose.connect(config.db.conn);

  // configure routes
  server.post('/commands',      commandApi.submit);
  server.get ('/commands/:id',  commandApi.get);

  return server;
};
