module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
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
        dest: 'public/build/uglified.js'
      }
    },

    cssmin: {
      options: {},
      minify: {
        src: [
          'public/bower_components/normalize-css/normalize.css',
          'public/bower_components/ngQuickDate/dist/ng-quick-date.css',
          'public/bower_components/ngQuickDate/dist/ng-quick-date-default-theme.css',
          // 'public/bower_components/components-font-awesome/css/font-awesome.min.css',
          'public/bower_components/jquery-ui/themes/smoothness/jquery-ui.css',
          'public/css/style.css'
        ],
        dest: 'public/build/concatStyles.css',
        ext:'.min.css'
      },
    },

    watch: {
      files: [
        'public/js/*.js',
        'public/css/style.css',
        'public/directiveTemplates/*.html',
        'public/directiveTemplates/larger_components*.html',
        'public/partials/*',
        'views/*',
        'views/partials/*'
      ],
      tasks: ['default']
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        // autoWatch: true
        background: true
      }
    }

  });

  // Load Plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  // Tasks to run
  grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'karma:unit:run']);



};
