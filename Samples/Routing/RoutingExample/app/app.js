(function() {
    
    var app = angular.module('demoApp',['ngRoute', 'ngAnimate']);

    app.config(function($routeProvider) {
        $routeProvider.when('/',
        {
            controller: 'CustomersController',
            templateUrl: 'app/views/customers.html',
            resolve: {
                customers: function (customersService) {
                    return customersService.getCustomers();
                }
            }
        })
        .when('/orders/:customerId',
        {
            controller: 'OrdersController',
            templateUrl: '/app/views/orders.html',
            //templateUrl: 'templates/orders.html' //Load a local template
            caseInsensitiveMatch: true //Case doesn't matter for this route
        })
        .otherwise({ redirectTo: '/' });
    });

}());

