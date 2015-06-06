(function() {

    function OrdersController() {
        this.name = 'Orders';
        this.messages = [];
    }

    OrdersController.prototype.canActivate = function() {
        return true;
    };

    OrdersController.prototype.activate = function() {
        this.messages.push('Activated');
    };

    OrdersController.prototype.canDeactivate = function() {
        return true;
    };

    OrdersController.prototype.deactivate = function() {

    };

    angular.module('routerDemo')
           .controller('OrdersController', OrdersController);

}());
