(function() {

	var customersFactory = function($http) { 
	    var factory = {};

	    factory.getCustomers = function() {
	        return $http.get('/customers.json').success(function (custs) {
	            return custs;
	        });
	    };
	    
	    return factory;
	};

	customersFactory.$inject = ['$http'];

	angular.module('demoApp').factory('customersService', customersFactory);

}());