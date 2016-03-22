'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

var util = require('util');

var browserSync = require('browser-sync');

var middleware = require('./proxy');

var historyApiFallback = require('connect-history-api-fallback');
var $ = require('gulp-load-plugins')({
  pattern : [ 'gulp-*', 'main-bower-files', 'uglify-save-license', 'del' ]
});

function browserSyncInit(baseDir, files, browser, options) {
  browser = browser === undefined ? 'default' : browser;

  if (options !== undefined) {

  }

  var routes = null;
  if (baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components' : 'bower_components',
      '/tasks' : 'index.html'
    };
  }

  var browserSyncOptions = {
    startPath : '/',
    server : {
      baseDir : baseDir,
      middleware : historyApiFallback(),
      routes : routes
    },
    port : 8001
  }

  if (options && options.startPath) {
    browserSyncOptions.startPath = options.startPath;
  }

  if (browser) {
    browserSyncOptions.browser = browser;
  }

  if (options && options.routes) {
    browserSyncOptions.server.routes = options.routes;
  }

  if (options && options.port) {
    browserSyncOptions.port = options.port;
  }

  if (options && options.middleware) {
    browserSyncOptions.middleware = options.middleware;
  }

  if (options && options.ui) {
    browserSyncOptions.ui = options.ui;
  }

  if (options && options.newInstance) {
    browserSync.instance = browserSync.create().init(files, browserSyncOptions);
  } else {
    if (browserSync['instances'] === undefined) {
      browserSync['instances'] = [];
    }
    browserSync['instances'][browserSync['instances'].length] = browserSync.init(files, browserSyncOptions);
  }

}
// DEV
gulp.task('serve', function() {
  browserSyncInit(paths.src);
});

// DIST
gulp.task('serve:dist', ['serve:dist:assets'], function() {
  browserSyncInit(paths.dist + '', null, [], {
    port : 8001,
    newInstance: true,
    ui : {
      port : 3004
    }
  });
});

gulp.task('serve:dist:assets', function() {
  browserSyncInit(paths.dist, null, null, {
    startPath : '/robots.txt',
    middleware : function(req, res, next) {
      if (/^\/(scripts|styles)\/(.*?).(js|css)/.test(req.url)) {
        res.setHeader('Content-Encoding', 'gzip');
      }

      res.setHeader('Access-Control-Allow-Origin', '*');

      next();
    },
    port : 3001
  });
});

//E2E DEV
gulp.task('serve:e2e-dev', function() {
  browserSyncInit(paths.src, null, [], {
    port : 8001
  });
});

// E2E DIST
gulp.task('serve:dist:e2e:assets', function() {
  browserSyncInit(paths.dist, null, [], {
    startPath : '/robots.txt',
    middleware : function(req, res, next) {
      if (/^\/(scripts|styles)\/(.*?).(js|css)/.test(req.url)) {
        res.setHeader('Content-Encoding', 'gzip');
      }

      res.setHeader('Access-Control-Allow-Origin', '*');

      next();
    },
    port : 3001,
    ui : {
      port : 3003
    }
  });
});
gulp.task('serve:e2e-dist', [ 'serve:dist:e2e:assets' ], function() {
  browserSyncInit(paths.dist, null, [], {
    newInstance : true,
    port : 8001,
    ui : {
      port : 3004
    }
  });
});
