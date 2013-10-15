'use strict';

angular.module('villageAdminApp')
  .controller('FamilyListCtrl', function ($scope, queryApi) {
    var query = queryApi.for('family', { projection:'detail' });
    $scope.families = query.execute('', { status: 'active' });

  });
