var app = angular.module('routerApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        
        .state('home.list', {
            url: '/list',
            templateUrl: 'colors-list.html',
            controller: function($scope) {
                $scope.colors = ['Blue', 'Red', 'Yellow'];
            }
        })
        
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'Home paragraph goes here.'
        })
        
        .state('customers', {
            url: '/customers',
                templateUrl: 'customers.html',
                controller: 'customersController'
        })

        .state('customers.detail', {
          url: '^/:id',
          views: {
            'detail': {
                templateUrl: 'customer-details.html',
                controller: 'customerDetailsController' 
            }
          },
        })
        
});

app.controller('customerDetailsController', function($scope, $stateParams, customersService) {
    $scope.selectedCustomer = null;

    function init() {
        if ($stateParams.id) {
            console.log('Found id: ' + $stateParams.id);
            $scope.selectedCustomer = customersService.getCustomer(+$stateParams.id);
        }
    }

    init();
})

app.controller('customersController', function($scope, customersService) {

    $scope.customers = customersService.getCustomers();
    
});

app.service('customersService', function() {
    var customers = [
        {
            id: 1,
            name: 'Jean Thomas',
            total: 50
        },
        {
            id: 2,
            name: 'Sean Jones',
            total: 10000
        },
        {
            id: 3,
            name: 'Michelle Jamison',
            total: 20000
        }
    ];

    var service = this;

    service.getCustomers = function() {
        return customers;
    };

    service.getCustomer = function(id) {
        var custs = customers.filter(function(cust) {
            return cust.id === id;
        });
        if (custs && custs.length > 0) {
            return custs[0];
        }
        return null;
    };
});