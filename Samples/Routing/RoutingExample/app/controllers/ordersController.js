(function() {

	var OrdersController = function($scope, $routeParams, ordersService) {
	    $scope.customerId = $routeParams.customerId;

	    function init() {
	        ordersService.getCustomerOrders($scope.customerId).success(function (orders) {
	            $scope.orders = orders;
	        });
	    }

	    init();
    };

    OrdersController.$inject = ['$scope', '$routeParams', 'ordersService'];
	
    angular.module('demoApp').controller('OrdersController', OrdersController);

}());