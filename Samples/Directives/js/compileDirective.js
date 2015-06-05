(function() {

  var app = angular.module('directivesModule');

  app.directive('compileDirective', function () {
      return {
          restrict: 'A',
          compile: function(tElem, tAttrs) {
              console.log('Compile output: ' + tElem.html());
              console.log('');
              return {
                  pre: function(scope, elem, attrs){
                        console.log('\nPre link output: ' + elem.html());
                        console.log('');
                  },
                  post: function(scope, elem, attrs){
                        console.log('\nPost link output: ' + elem.html());
                        console.log('');
                  }
               }
           }
      };
  });

}());