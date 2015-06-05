$scope.customers = [
    {"id": 1, "name":"Ted", "total": 5.996}, 
    {"id": 2, "name":"Michelle", "total": 10.994}, 
    {"id": 3, "name":"Zed", "total": 10.99}, 
    {"id": 4, "name":"Tina", "total": 15.994}
];


app.config(function($routeProvider) {
    $routeProvider.when('/',
    {
        controller: 'CustomersController',
        templateUrl: 'app/views/customers.html'
    })
    .when('/orders',
    {
        controller: 'OrdersController',
        templateUrl: 'app/views/orders.html'
    })
});


app.factory('customersFactory', function($http) { 
    var factory = {};
    factory.getCustomers = function() {
        return $http.get('/customers.json');
    };
    return factory;
});