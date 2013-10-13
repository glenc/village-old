var _      = require('underscore');
var errors = require('./errors');

var QueryService = module.exports = (function() {
  var models = {};

  var registerQuery = function(query) {
    var model = models[query.model] || {};
    model.queries = model.queries || [];
    model.queries.push(query);
    models[query.model] = model;
  };

  var registerProjection = function(projection) {
    var model = models[projection.model] || {};
    model.projections = model.projections || [];
    model.projections.push(projection);
    models[projection.model] = model;
  };

  var getModels = function() {
    return Object.keys(models);
  };

  var getQueries = function(model) {
    if (!models[model]) return [];
    return models[model].queries.map(function(q) { return q.name; });
  };

  var execute = function(model, query, projection, parameters, callback) {
    if (!models[model]) return callback(new errors.UnknownModelError());

    var q = _.find(models[model].queries, function(q) { return q.name == query; });
    if (!q) return callback(new errors.UnknownQueryError());

    var p = _.find(models[model].projections, function(p) { return p.name == projection; });
    if (!p) p = { select: '' };

    q.execute(parameters, p, callback);
  };

  return {
    registerProjection: registerProjection,
    registerQuery: registerQuery,
    getModels: getModels,
    getQueries: getQueries,
    execute: execute
  };
})();
