(function() {

  var app = angular.module('directivesModule');

  app.directive('tableHelperController', function () {
      
      //Template can be stored in a separate file if desired
      var template = '<div class="tableHelper">' +
                     '<table>' +
                         '<thead>' +
                             '<tr>' +
                                 '<th ng-repeat="col in vm.columns" ng-click="vm.sort(col)">{{col}}</th>' +
                             '</tr>' + 
                         '</thead>' +
                         '<tbody>' +
                             '<tr ng-repeat="row in vm.datasource | orderBy:vm.orderby:vm.reverse">' +
                             '<td ng-repeat="value in vm.getRowValues(row)">{{value}}</td>' +
                             '</tr>' +
                         '</tbody>' +
                     '</table>' +
                     '<br /><div class="rowCount">{{vm.datasource.length}} rows</div></div>',

      controller = ['$scope', function($scope) {
          var vm = this,
              visibleProps = [];

          vm.columns = [];
          vm.reverse = false;
          vm.orderby;
          
          $scope.$watchCollection('datasource', getColumns);
          
          //Handle sorting of data as user clicks on a column in the table
          vm.sort = function(col) {
              if (vm.columnmap) {
                  //The col value is the "friendly" value so we need to figure out the "raw" value
                  rawCol = getRawColumnName(col);
                  vm.reverse = (vm.orderby === rawCol) ? !vm.reverse: false;
                  vm.orderby = rawCol;
              }
              else {
                  vm.reverse = (vm.orderby === col) ? !vm.reverse: false;
                  vm.orderby = col;   
              }
          }
          
          //Get the columns to display in the table header
          function getColumns() {
              
              //Since columnmap is an '@' property in this example (to demonstrate we can do that)
              //we need to convert it to an object. 
              //Can use $scope.$eval or $parse service ($parse is in another example)
              //See https://docs.angularjs.org/guide/expression
              vm.columnmap = $scope.$eval(vm.columnmap);
              
              if (vm.columnmap) {
                  //Use columnmap to handle displaying columns
                  vm.columnmap.forEach(function(map) {
                      if (!map.hidden) {                      
                          for (var prop in map) {
                              if (prop !== 'hidden') pushColumns(prop, map[prop]);
                          }
                      }                  
                  });
              }
              else {
                  //No column map so default to raw properties
                  for (var prop in vm.datasource[0]) {
                      pushColumns(prop, prop);
                  }
              }
          }
          
          //Load each row's values in the proper order based upon order of the columnmap
          //We could use ng-repeat="(key,value) in row" on the <td> but the order that data 
          //is written out won't match with the headers. This functions handles that issue.
          vm.getRowValues = function(row) {
              var sortedValues = [];
              if (vm.columnmap) {
                  visibleProps.forEach(function(prop) {
                      sortedValues.push(row[prop]);   
                  });
              }
              return sortedValues;
          };
          
          function getRawColumnName(friendlyCol) {
              var rawCol;
              vm.columnmap.forEach(function(colMap) { 
                  for (var prop in colMap) {
                      if (colMap[prop] === friendlyCol) {
                         rawCol = prop;
                         break;
                      }
                  }
                  return null;
              });   
              return rawCol;
          }
                
          function pushColumns(rawCol, renamedCol) {
              visibleProps.push(rawCol);
              vm.columns.push(renamedCol);
          }

      }];
      
      return {
          restrict: 'E',
          replace: true,
          scope: {
            columnmap: '@',
            datasource: '='  
          },
          controller: controller,
          controllerAs: 'vm',
          bindToController: true,
          template: template
      };
  });

}());