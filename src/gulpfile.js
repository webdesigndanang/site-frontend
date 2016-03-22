'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.paths = {
  src : './',
  dist : './dist/',
  tmp : '.tmp/',
  e2e : 'test/e2e/',
  test : 'test/'
};

require('require-dir')('./gulp');

gulp.task('build', [ 'clean', 'config' ], function() {
  gulp.start('buildapp');
});

gulp.task('config', function() {
  var dest = '';
  var configFile = '';

  if (process.env.NODE_ENV == 'development') {
    dest = gulp.paths.src + "app";
    configFile = "dev-config.json";
  } else if (process.env.NODE_ENV == 'test') {
    dest = gulp.paths.src + "app";
    configFile = "test-config.json";
  } else {
    dest = gulp.paths.src + "app";
    configFile = "config.json";
  }

  var myConfig = require('./' + configFile);

  console.log('Generating Config file for ' + process.env.NODE_ENV + '.  Saving to ' + dest);
  
});
