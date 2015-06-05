(function() {

  var app = angular.module('directivesModule');

  app.directive('sharedScope', function () {
    return {
      template: 'Name: {{customer.name}} Street: {{customer.street}}'
    };
  });

}());