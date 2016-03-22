'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var $ = require('gulp-load-plugins')();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function(cb) {
  return gulp.src('./src/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(paths.src + '/styles/'));
});
