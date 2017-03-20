(function () {

    var ordersFactory = function ($http) {
        var factory = {};

        factory.getCustomerOrders = function (id) {
            return $http.get('/orders.json').then(function (orders) {
                return orders.data;
            });
        };

        return factory;
    };

    ordersFactory.$inject = ['$http'];

    angular.module('demoApp').factory('ordersService', ordersFactory);

}());