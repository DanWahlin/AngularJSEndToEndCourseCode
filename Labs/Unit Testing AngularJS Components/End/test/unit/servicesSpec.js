'use strict';

describe('reminderFactory tests', function (){
  var factory;
  
  //excuted before each "it" is run.
  beforeEach(function (){
    
    module('reminderApp');
    
    //inject  factory for testing
    inject(function(reminderFactory) {
      factory = reminderFactory;
    });
	
	  var store = {reminder1:'reminder1',reminder2:'reminder2',reminder3:'reminder3'};

	  spyOn(localStorage, 'getItem').and.callFake(function (key) {
		  return store[key];
	  });

	  spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
		  return store[key] = value + '';
	  });

	  spyOn(localStorage, 'clear').and.callFake(function () {
		  store = {};
	  });
	  
      spyOn(Object, 'keys').and.callFake(function (key) {
  		var keys=[];
  		for(var key in store)
  			keys.push(key);
  		return keys;
	  });

  });
     
	it('should have get and put functions', function () {
	    expect(angular.isFunction(factory.get)).toBe(true);
	    expect(angular.isFunction(factory.put)).toBe(true);
	});

	it('should return 3 reminders initially', function () {
	    var result = factory.get();
	    expect(result.length).toBe(3);
	});
	  
	it('should return 4 reminders after adding one more', function () {
	    factory.put('reminder4');
	    var result = factory.get();
	    expect(result.length).toBe(4);
	});



});
