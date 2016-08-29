var reminderApp=angular.module('reminderApp',[]);

reminderApp.controller('ReminderController', function($scope,reminderFactory) {
      
	 $scope.reminders = reminderFactory.get();
	
	 $scope.$on("newReminder", function(event) {
	    $scope.reminders = reminderFactory.get();
	 });

	
	 $scope.createReminder=function() {
		  reminderFactory.put($scope.reminder);
		  $scope.reminder = "";
	 }
});
 
reminderApp.factory('reminderFactory',function($rootScope){
       return {

              get:function(){
					var reminders=[];
                    var keys=Object.keys(localStorage);
					for(var i=0;i<keys.length;i++){
						reminders.push(localStorage.getItem(keys[i]));
					}
                    return reminders;
              },

              put:function(reminder){
                localStorage.setItem('reminder'+(Object.keys(localStorage).length+1), reminder);
				$rootScope.$broadcast("newReminder");
              }
       }
});  