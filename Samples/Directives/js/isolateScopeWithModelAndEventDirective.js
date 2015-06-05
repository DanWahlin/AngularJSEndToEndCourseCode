(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithModelAndEvent', function () {
      return {
          restrict: 'EA',
          scope: {
              datasource: '=',
              click: '&'
          },
          template: 'Name: {{datasource.name}} Street: {{datasource.street}} <button ng-click="click()">Change Data</button>'
      };
  });

}());