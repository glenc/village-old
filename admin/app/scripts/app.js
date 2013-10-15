'use strict';

angular.module('villageAdminApp', [
    'ngRoute'
  ])

  // routes
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'views/family-list.html', controller: 'FamilyListCtrl' })
      .otherwise({ redirectTo: '/' });
  });
