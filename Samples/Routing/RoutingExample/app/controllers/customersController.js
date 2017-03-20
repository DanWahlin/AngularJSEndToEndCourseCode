(function() {

    var CustomersController = function($scope, customers /* passed in by $routeProvider */) {
        $scope.customers = customers;
    };

    CustomersController.$inject = ['$scope', 'customers'];

    angular.module('demoApp').controller('CustomersController', CustomersController);

}());
        
