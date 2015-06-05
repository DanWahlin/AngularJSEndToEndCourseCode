//Based upon the idea shown at https://www.youtube.com/watch?v=NlxqFADso6M
(function() {

  var app = angular.module('directivesModule');

  app.directive('lazyLoad', ['$interpolate', function ($interpolate) {

      var compile = function(tElem, tAttrs) {
          var interpolateFunc = $interpolate(tAttrs.lazyLoad);
          tAttrs.$set('lazyLoad', null);
          
          return function(scope, elem, attrs) {
              elem.on(attrs.trigger, function(event) {
                  var attr = attrs.attribute;
                  if (!elem.attr(attr)) {
                      var val = interpolateFunc(scope);
                      elem.attr(attr, val);
                  }
              });
          };
      };
      
      return {
          restrict: 'A',
          compile: compile
      };
  }]);

}());