'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var minifyCss = require('gulp-clean-css');
var rev = require('gulp-rev');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('concatAssets', function() {

  return gulp.src([paths.src + 'index.html'], {base: paths.src})
    .pipe(usemin({
      css: [ minifyCss, rev ],
      js: [ ngAnnotate, uglify, rev ],
      assetsDirs: [paths.dist, paths.dist + 'images']
    }))
    .pipe(gulp.dest(paths.dist));
});