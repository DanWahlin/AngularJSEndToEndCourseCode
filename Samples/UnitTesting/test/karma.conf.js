module.exports = function(config) {

    config.set({
      basePath : '../',
      frameworks: ['jasmine'],

      files : [
        'app/lib/angular.js',
        'app/lib/angular-*.js',
        'app/*.js',
        'test/unit/*.js'
      ],

      autoWatch : true,

      browsers : ['Chrome']

    });

};
