(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithModelEventAndArray', function () {
      return {
          restrict: 'EA',
          scope: {
              datasource: '=',
              add: '&',
          },
          template: '<button ng-click="add()">Change Data</button><ul><li ng-repeat="item in datasource">{{ item.name }}</li></ul>'
      };
  });

}());