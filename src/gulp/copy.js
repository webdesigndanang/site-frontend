'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var gulpCopy = require('gulp-copy');
var rev = require('gulp-rev');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('copy:images', function() {
  return gulp.src(paths.src + '/images/**/*.{png,jpg,jpeg,gif,svg}')
  .pipe(rev())
  .pipe(gulp.dest(paths.dist + '/images'))
  .pipe(rev.manifest('rev-manifest.json', {
    
  }))
  .pipe(gulp.dest(paths.tmp + 'images'))
  ;
});

gulp.task('copy:dist', ['copy:fonts', 'copy:images'], function() {
  gulp.src([
    '*.{ico,png,txt}',
    'fonts/**/*'
  ])
  .pipe(gulpCopy(paths.dist, {}));
});

gulp.task('copy:fonts', [], function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,otf,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(paths.dist + '/fonts/'));
});
