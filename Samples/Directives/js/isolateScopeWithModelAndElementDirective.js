(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithModelAndElement', function () {
      return {
          restrict: 'EA', //Restrict to Element and Attribute
          scope: {
              datasource: '='
          },
          template: 'Name: {{datasource.name}} Street: {{datasource.street}}'
      };
  });

}());