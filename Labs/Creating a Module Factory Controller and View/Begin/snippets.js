var app = angular.module('demoApp',['ngRoute', 'ngAnimate']);

app.config(function($routeProvider) {
    $routeProvider.when('/',
    {
        controller: 'CustomersController',
        templateUrl: 'app/views/customers.html'
    })
    .when('/orders/:customerId',
    {
        controller: 'OrdersController',
        templateUrl: 'app/views/orders.html'
    })
});

app.controller('CustomersController', function($scope, customersFactory) {
    $scope.customers = null;
    
    function init() {
        $scope.customers = customersFactory.getCustomers();
    }
    
    init();
});

app.controller('OrdersController', function($scope, $routeParams) {
    $scope.customerId = $routeParams.customerId;
});

app.factory('customersFactory', function() { 
    var customers = [
        {id: 1, name:"Ted", total: 5.996}, 
        {id: 2, name:"Michelle", total: 10.994}, 
        {id: 3, name:"Zed", total: 10.99}, 
        {id: 4, name:"Tina", total: 15.994}
    ];
    var factory = {};
    factory.getCustomers = function() {
        return customers;
    };
    return factory;
});