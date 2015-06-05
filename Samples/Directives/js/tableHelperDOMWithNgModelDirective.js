(function() {

  var app = angular.module('directivesModule');

  app.directive('tableHelperDomWithNgModel', function () {
      
      var template = '<div class="tableHelper"></div>',
     
      //ngModel object will be passed in due to require: 'ngModel' in DDO below
      link = function(scope, element, attrs, ngModel) {
          var headerCols = [],
              tableStart = '<table>',
              tableEnd = '</table>',
              table = '',
              visibleProps = [],
              datasource,
              sortCol = null,
              sortDir = 1;
          
          //Watch for ngModel to change. Required since the $modelValue will be NaN initially
          scope.$watch(attrs['ngModel'], render);
          wireEvents();
          
          function render() {
              if (ngModel && ngModel.$modelValue.length) {
                  datasource = ngModel.$modelValue;
                  table += tableStart;
                  table += renderHeader();
                  table += renderRows() + tableEnd;
                  renderTable();
              }
          }
          
          function wireEvents() {
              element.on('click', function(event) {
                 if (event.srcElement.nodeName === 'TH') {
                     var val = event.srcElement.innerHTML;
                     var col = (scope.columnmap) ? getRawColumnName(val) : val;
                     if (col) sort(col);
                 }
              });   
          }
          
          function sort(col) {
              //See if they clicked on the same header
              //If they did then reverse the sort
              if (sortCol === col) sortDir = sortDir * -1;
              sortCol = col;
              datasource.sort(function(a,b) {
                 if (a[col] > b[col]) return 1 * sortDir;
                 if (a[col] < b[col]) return -1 * sortDir;
                 return 0;
              });
              render();
          }
          
          function renderHeader() {
               var tr = '<tr>';
               for (var prop in datasource[0]) {
                   var val = getColumnName(prop);
                   if (val) {
                       //Track visible properties to make it fast to check them later
                       visibleProps.push(prop); 
                       tr += '<th>' + val + '</th>'; 
                   }
               }
               tr += '</tr>';
               tr = '<thead>' + tr + '</thead>';
               return tr;
          }
          
          function renderRows() {
               var rows = '';
               for (var i = 0, len = datasource.length; i < len; i++) {
                    rows += '<tr>';
                    var row = datasource[i];
                    for (var prop in row) {
                        if (visibleProps.indexOf(prop) > -1) {
                            rows += '<td>' + row[prop] + '</td>';
                        }
                    }
                    rows += '</tr>';
               }
               rows = '<tbody>' + rows + '</tbody>';
               return rows;   
          }
          
          function renderTable() {
              table += '<br /><div class="rowCount">' + datasource.length + ' rows</div>';
              element.html(table);
              table = '';
          }
          
          function getRawColumnName(friendlyCol) {
              var rawCol;
              scope.columnmap.forEach(function(colMap) { 
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
                
          function getRawColumnName(friendlyCol) {
              var rawCol;
              scope.columnmap.forEach(function(colMap) { 
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
                
          function filterColumnMap(prop) {
              var val = scope.columnmap.filter(function(map) { 
                  if (map[prop]) {
                      return true;   
                  }
                  return false;
              });   
              return val;
          }
          
          function getColumnName(prop) {
              if (!scope.columnmap) return prop;
              var val = filterColumnMap(prop);
              if (val && val.length && !val[0].hidden) return val[0][prop];
              else return null; 
          }

      };
      
      return {
          restrict: 'E',
          require: 'ngModel',
          scope: {
            columnmap: '=' 
          },
          link: link,
          template: template
      };
  });

}());