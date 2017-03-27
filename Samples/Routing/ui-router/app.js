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
            controller: 'customersController',
            data: {
                auth: true
            }
        })

        .state('customers.detail', {
          url: '/:id', //use '^/:id' to make it a root route
          views: {
            'detail': {
                templateUrl: 'customer-details.html',
                controller: 'customerDetailsController'
            }
          }
        });
        
});

app.run(function($transitions) {
    $transitions.onBefore( { to: 'customers.detail' }, function(trans) {
        console.log('Before customers.detail state');
        console.log('customers.detail state requires auth? ' + trans.to().data.auth);
        return true;
    });
    $transitions.onEnter( { to: 'customers.detail' }, function(trans, state) {
        console.log('Entering customers.detail state');
    });
    $transitions.onExit( { exiting: 'customers.detail' }, function(trans, state) {
        console.log('Leaving customers.detail state');
    });
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