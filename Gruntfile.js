module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: [
        // 'public/js/*.js', 
        'public/bower_components/jquery/jquery.min.js', 
        'public/bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
        'public/bower_components/angular/angular.min.js', 
        'public/bower_components/angular-cookies/angular-cookies.min.js', 
        'public/bower_components/angular-resource/angular-resource.min.js',
        'public/bower_components/angular-route/angular-route.min.js',
        'public/bower_components/ngQuickDate/dist/ng-quick-date.js',
         'public/bower_components/d3module.js',
         'public/build/uglified.js'
        ],
        dest: 'public/build/concat.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress: {
          drop_console: true
        },
        preserveComments: false
      },
      build: {
        src: [
            'public/js/*.js', 
            'public/bower_components/angular-ui-slider/src/slider.js', 
            'public/bower_components/dropdown.js',
        ],
        // dest: 'public/build/<%= pkg.name %>.min.js'
        dest: 'public/build/uglified.js'
      }
    }
  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Tasks to run
  grunt.registerTask('default', ['uglify', 'concat']);

};
