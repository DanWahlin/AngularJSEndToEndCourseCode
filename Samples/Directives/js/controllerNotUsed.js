(function() {

  var app = angular.module('directivesModule');

  app.directive('controllerNotUsed', function () {
      
      var link = function (scope, element, attrs) {
              
              //Create a copy of the original data that’s passed in              
              var items = angular.copy(scope.datasource);
              
              function init() {
                  var html = '<button id="addItem">Add Item</button><div></div>';
                  element.html(html);
                  
                  element.on('click', function(event) {
                      if (event.srcElement.id === 'addItem') {
                          addItem();
                          event.preventDefault();
                      }
                  });
              }
              
              function addItem() {
                  //Call external function passed in with &
                  scope.add();

                  //Add new customer to the local collection
                  items.push({
                      name: 'New Directive Customer'
                  });
                  
                  render();
              }
              
              function render() {
                  var html = '<ul>';
                  for (var i=0,len=items.length;i<len;i++) {
                      html += '<li>' + items[i].name + '</li>'
                  }
                  html += '</ul>';                  
                  
                  element.find('div').html(html);
              }
              
              init();
              render();        
      };
      
      
      return {
          restrict: 'EA',
          scope: {
              datasource: '=',
              add: '&',
          },
          link: link
      };
  });

}());