describe('directive tests', function() {
	var scope, compile;

    beforeEach(function() {
    	module('reminderApp');
    	inject(function($rootScope, $compile) {
              scope = $rootScope.$new();
              compile = $compile;
    	});
    });

	it('should set background to rgb(128, 128, 128)', function() {	  
		  elem = angular.element("<span custom-color=\"rgb(128, 128, 128)\">sample</span>");
		  
		  compile(elem)(scope);

	      expect(elem.css("background-color")).toEqual('rgb(128, 128, 128)');
	});
});