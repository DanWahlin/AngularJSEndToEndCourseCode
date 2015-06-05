(function () {

    var injectParams = ['$http', '$rootScope'];

    var authFactory = function () {
        var serviceBase = '/api/dataservice/',
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };







        return factory;
    };

    authFactory.$inject = injectParams;

    angular.module('customersApp').factory('authService', authFactory);

}());

