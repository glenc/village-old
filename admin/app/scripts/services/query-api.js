'use strict';

angular.module('villageAdminApp')
  .factory('queryApi', function ($http) {

    var createQueryService = function(model, options) {
      _.defaults(options, { projection: '', name: '' });
      return {
        execute: function(name, parameters, callback) {
          console.log('executing');
        },
        get: function(id) {
          console.log('getting');
        }
      };
    }

    // Public API here
    return {
      for: createQueryService
    };
  });
