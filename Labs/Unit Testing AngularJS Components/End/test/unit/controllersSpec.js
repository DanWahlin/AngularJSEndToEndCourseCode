'use strict';

describe('ReminderController Test', function() {
	var scope, controller;
	var mockFactory = {
		reminders:['reminder1','reminder2'],
		get: function (){
			return this.reminders;
		},
		put:function(content){
			this.reminders.push(content);
		}
	};

	beforeEach(function() {
	    module('reminderApp');

	    inject(function($rootScope, $controller) {
	         scope = $rootScope.$new();
	         controller = $controller("ReminderController", 
	            {$scope: scope, reminderFactory:mockFactory });
	    });
	});
	it('should return reminders array with 2 elements, add one,' +
	   ' and return 3', function() {
		  expect(scope.reminders.length).toBe(2);
		  scope.reminder = "reminder3";
		  scope.createReminder();
		  expect(scope.reminders.length).toBe(3);
	});



});
