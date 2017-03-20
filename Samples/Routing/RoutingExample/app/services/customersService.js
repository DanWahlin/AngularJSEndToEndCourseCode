(function() {

	var customersFactory = function($http) { 
	    var factory = {};

	    factory.getCustomers = function() {
	        return $http.get('/customers.json').then(function (custs) {
	            return custs.data;
	        });
	    };
	    
	    return factory;
	};

	customersFactory.$inject = ['$http'];

	angular.module('demoApp').factory('customersService', customersFactory);

}());