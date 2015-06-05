(function () {

    var ordersFactory = function ($http) {
        var factory = {};

        factory.getCustomerOrders = function (id) {
            return $http.get('/orders.json').success(function (orders) {
                return orders;
            });
        };

        return factory;
    };

    ordersFactory.$inject = ['$http'];

    angular.module('demoApp').factory('ordersService', ordersFactory);

}());