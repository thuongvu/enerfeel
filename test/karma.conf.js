// Karma configuration
// Generated on Fri Feb 21 2014 13:15:48 GMT-0800 (PST)

module.exports = function(config) {
  config.set({

    // base path, that will be used to resolve files and exclude
    basePath: '..',


    // frameworks to use
    frameworks: ['jasmine'],

    

    // list of files / patterns to load in the browser
    files: [
      {pattern: 'public/bower_components/jquery/jquery.min.js', watched: false},
      {pattern: 'public/bower_components/jquery-ui/ui/minified/jquery-ui.min.js', watched: false},
      {pattern: 'public/bower_components/angular/angular.min.js', watched: false},
      {pattern: 'public/bower_components/angular-mocks/angular-mocks.js', watched: false},
      {pattern: 'public/bower_components/angular-cookies/angular-cookies.min.js', watched: false},
      {pattern: 'public/bower_components/angular-resource/angular-resource.min.js', watched: false},
      {pattern: 'public/bower_components/angular-route/angular-route.min.js', watched: false},
      {pattern: 'public/bower_components/ngQuickDate/dist/ng-quick-date.min.js', watched: false},
      {pattern: 'public/bower_components/angular-ui-slider/src/slider.js', watched: false},
      {pattern: 'public/bower_components/dropdown.js', watched: false},
      {pattern: 'public/bower_components/d3module.js', watched: false},
      {pattern: 'public/directiveTemplates/*.html', watched: false},
      {pattern: 'public/directiveTemplates/larger_components/*.html', watched: false},
      {pattern: 'public/js/*.js', watched: true},
      {pattern: 'test/*.js'}
    ],


     preprocessors: {
       'public/directiveTemplates/*.html': 'ng-html2js',
       'public/directiveTemplates/larger_components/*.html': 'ng-html2js',
     },
       
     ngHtml2JsPreprocessor: {
         // setting this option will create only a single module that contains templates
         // from all the files, so you can load them all with module('foo')
        // cacheIdFromPath: function(filepath) {
        //         return '/vision/assets/' + filepath;
        //     },
        // stripPrefix: 'public/',
        // prependPrefix: 'served/',
        moduleName: 'templates'
    },


    // list of files to exclude
    exclude: [
      
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera (has to be installed with `npm install karma-opera-launcher`)
    // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
    // - PhantomJS
    // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
    browsers: ['Chrome'],


    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
