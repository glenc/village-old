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
      var projection = req.params.projection || '';

      queryService.get(model, req.params.id, projection, function(err, result) {
        if (err) return next(err);
        res.send(200, result);
        return next();
      });
    };
  };

  var registerRoutes = function(server) {
    var nounInflector = new natural.NounInflector();
    var models = queryService.getRegisteredModels();

    models.forEach(function(model) {
      var routeBase = '/' + nounInflector.pluralize(model);

      // queries
      var queries = queryService.getRegisteredQueries(model);
      var hasGetter = false;
      queries.forEach(function(query) {
        if (query == 'get') {
          hasGetter = true;
        } else {
          var route = routeBase + '/' + query;
          console.log('GET  %s', route);
          server.get(route, new queryHandler(model, query));
        }
      });

      // do getter last so named queries get execited first
      if (hasGetter) {
        var route = routeBase + '/:id';
        console.log('GET  %s', route);
        server.get(route, new getHandler(model));
      }
    });
  };

  return {
    registerRoutes: registerRoutes
  }
})();
