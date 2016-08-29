describe('filter tests', function() {

    beforeEach(function() {
    	module('reminderApp');
    });

	it('should truncate the input to 10 characters', function() {
		inject(function(truncateFilter) {
	    	expect(truncateFilter('abcdefghijk',10).length).toBe(10);
		});
	});
});