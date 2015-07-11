module.exports = function (grunt) {
  // grunt tasks
  [
    'grunt-cafe-mocha',
    'grunt-contrib-jshint',
    'grunt-exec'
  ].forEach(function (task) {
    // load grunt tasks
    grunt.loadNpmTasks(task);
  });

  // set grunt tasks setting
  grunt.initConfig({
    cafemocha: {
      all: { src: 'qa/tests-*.js', options: { ui: 'tdd' } }
    },
    jshint: {
      app: ['meadowlark.js', 'public/js/**/*.js', 'lib/**/*.js'],
      qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js']
    },
    exec: {
      linkchecker: { cmd: 'linkchecker http://localhost:3000' }
    }
  });

  // register grunt work
  grunt.registerTask('default', ['cafemocha', 'jshint', 'exec']);
};