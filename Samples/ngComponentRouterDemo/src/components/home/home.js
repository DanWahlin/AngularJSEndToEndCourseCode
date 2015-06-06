'use strict';

(function() {

    function HomeController() {
        this.name = 'Home';
        this.messages = [];
    }

    //Can configure child router here or by using $router.config()
    //in controller function. This keeps it clean and away from the
    //other details that the controller may expose in its function

    //NOTE: This doesn't work right now
//    HomeController.$routeConfig =[
//      {
//          path: '/',
//          components: {
//              detail: 'detail'
//          }
//      }
//    ];

    angular.module('routerDemo')
           .controller('HomeController', HomeController);

}());

