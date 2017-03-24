(function() {

    function CustomerDetailController() {
        var ctrl = this;

        ctrl.$onInit = function() {
            console.log('onInit called in component');
            console.log(ctrl.customer);
        };

        //Could add additional functionality here (functions to call for example)
    }

    angular.module('directivesModule')
           .component('customerDetail', {

        template: `
            <div>
                Name: <input ng-model="$ctrl.customer.name">
                <button ng-click="$ctrl.changeCustomer($ctrl.customer)">Change</button>
            </div>
        `,
        controller: CustomerDetailController,
        bindings: {
            customer: '<',      //One-way binding (but be careful not to change data in comnponent)
            changeCustomer: '&' //Expression/function binding
        }

    });

    angular.module('directivesModule')
           .component('customerDetailNoChanges', {

        template: '<div>Name: {{ $ctrl.customer.name }}</div>',
        controller: CustomerDetailController,
        bindings: {
            customer: '<'
        }

    });

}());