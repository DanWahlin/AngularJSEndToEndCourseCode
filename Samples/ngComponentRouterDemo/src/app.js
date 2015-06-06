'use strict';

(function() {

    var app = angular.module('routerDemo', ['ngNewRouter'])

    AppController.$inject = ['$router'];
    function AppController($router) {

        $router.config([
          {   path: '/', redirectTo: '/home' },
          {   path: '/home', component: 'home' },
          {   path: '/orders', component: 'orders' }
        ]);

    }

    app.controller('AppController', AppController);

}());
