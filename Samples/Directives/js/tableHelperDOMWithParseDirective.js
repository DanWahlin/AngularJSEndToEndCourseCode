(function() {

  var app = angular.module('directivesModule');

  app.directive('tableHelperDomWithParse', ['$parse', function ($parse) {
      
      var template = '<div class="tableHelper"></div>',
          
      link = function(scope, element, attrs) {
          var headerCols = [],
              tableStart = '<table>',
              tableEnd = '</table>',
              table = '',
              visibleProps = [],
              sortCol = null,
              sortDir = 1,
              columnmap = null;
          
          //Watch for changes to the collection so that the table gets re-rendered as necessary
          scope.$watchCollection('datasource', render);
          //columnmap = scope.$eval(attrs['columnmap']);
          //columnmap = $parse(attrs['columnmap'])();
          wireEvents();
          
          function render() {
              if (scope.datasource && scope.datasource.length) {
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
                     var col = (columnmap) ? getRawColumnName(val) : val;
                     if (col) sort(col);
                 }
              });   
          }
          
          function sort(col) {
              //See if they clicked on the same header
              //If they did then reverse the sort
              if (sortCol === col) sortDir = sortDir * -1;
              sortCol = col;
              scope.datasource.sort(function(a,b) {
                 if (a[col] > b[col]) return 1 * sortDir;
                 if (a[col] < b[col]) return -1 * sortDir;
                 return 0;
              });
              render();
          }
          
          function renderHeader() {
               var tr = '<tr>';
               for (var prop in scope.datasource[0]) {
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
               for (var i = 0, len = scope.datasource.length; i < len; i++) {
                    rows += '<tr>';
                    var row = scope.datasource[i];
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
              table += '<br /><div class="rowCount">' + scope.datasource.length + ' rows</div>';
              element.html(table);
              table = '';
          }
          
          function getRawColumnName(friendlyCol) {
              var rawCol;
              columnmap.forEach(function(colMap) { 
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
              var val = columnmap.filter(function(map) { 
                  if (map[prop]) {
                      return true;   
                  }
                  return false;
              });   
              return val;
          }
          
          function getColumnName(prop) {
              if (!columnmap) return prop;
              var val = filterColumnMap(prop);
              if (val && val.length && !val[0].hidden) return val[0][prop];
              else return null; 
          }

      };
      
      return {
          restrict: 'E',
          scope: {
            datasource: '='  
          },
          link: link,
          template: template
      };
  }]);

}());