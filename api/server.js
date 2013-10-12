var async           = require('async');
var glob            = require('glob');
var api             = require('./lib/api-server');
var commandService  = require('./lib/command-service');
var queryService    = require('./lib/query-service');

// initialize the environment
function getEnvironment() {
  if (process.argv.length > 2) {
    if (process.argv[1].match(/server\.js$/)) {
      return process.argv[2];
    }
  }
  return process.env.NODE_ENV || 'development';
}
var env = getEnvironment();

// load our configuration
var config = require('./config/' + env);

// load plugins
var loadPlugins = function(paths, register, done) {
  async.each(paths, function(path, cb) {
    glob(path, {}, function(err, files) {
      async.each(files, function(file, cb2) {
        var plugin = require('./' + file);
        register(plugin);
        cb2();
      }, cb);
    });
  }, done);
}

async.parallel([
  function(cb) {
    loadPlugins(config.handlers, function(handler) {
      commandService.registerHandler(handler.name, handler.handle);
    }, cb);
  },
  function(cb) {
    loadPlugins(config.queries, function(query) {
      queryService.registerQuery(query);
    }, cb);
  },
  function(cb) {
    loadPlugins(config.projections, function(projection) {
      queryService.registerProjection(projection);
    }, cb);
  }
],
function() {
  var server = api.createServer(config);
  server.listen(config.web.port, function start() {
    console.log('%s (%s) listening at %s', server.name, env, server.url);
  });
});
