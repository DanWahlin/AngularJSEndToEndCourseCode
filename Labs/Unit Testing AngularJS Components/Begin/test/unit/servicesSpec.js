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

	  spyOn(localStorage, 'getItem').andCallFake(function (key) {
		  return store[key];
	  });
	  spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
		  return store[key] = value + '';
	  });
	  spyOn(localStorage, 'clear').andCallFake(function () {
		  store = {};
	  });
    spyOn(Object, 'keys').andCallFake(function (key) {
  		var keys=[];
  		for(var key in store)
  			keys.push(key);
  		return keys;
	  });

  });
     




});
