(function() {

  var app = angular.module('directivesModule');

  app.directive('isolateScopeWithString', function () {
      return {
          scope: {
              name: '@' //Two-way data binding
          },
          template: 'Name: {{name}}'
      };
  });

}());