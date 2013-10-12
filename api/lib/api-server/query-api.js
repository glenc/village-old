var restify       = require('restify');
var natural       = require('natural');
var errors        = require('./errors');
var queryService  = require('../query-service');

var QueryApi = module.exports = (function() {

  var queryHandler = function(model, query) {
    return function(req, res, next) {
      var projection = req.params.projection || '';
      var params = req.params;
      delete req.params.projection;

      queryService.execute(model, query, projection, params, function(err, results) {
        if (err) return next(err);
        res.send(200, results);
        return next();
      });

    };
  };

  var getHandler = function(model) {
    return function(req, res, next) {
      res.send(200, {});
      return next();
    };
  };

  var registerRoutes = function(server) {
    var nounInflector = new natural.NounInflector();
    var models = queryService.getModels();

    models.forEach(function(model) {
      var routeBase = '/' + nounInflector.pluralize(model);

      // queries
      var queries = queryService.getQueries(model);
      queries.forEach(function(query) {
        var route = routeBase + '/' + query;
        console.log('query %s', route);
        server.get(route, new queryHandler(model, query));
      });

      // getter
      var route = routeBase + '/:id';
      console.log('get   %s', route);
      server.get(route, new getHandler(model));
    });
  };

  return {
    registerRoutes: registerRoutes
  }
})();
