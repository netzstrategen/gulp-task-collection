'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');

module.exports = (gulp, $, pkg) => {

  // @task: Build JS from components.
  function scriptTask(opts) {
    if (!pkg.gulpPaths.scripts.src) { return false }
    const options = getOptions($, pkg.gulpPaths.scripts.options, opts);
    const isProduction = options._[0]?.indexOf('production');

    let stream = gulp.src(pkg.gulpPaths.scripts.src, { sourcemaps: options.sourcemaps })
      .pipe($.if(!options['fail-after-error'], $.plumber()));

    if (!isProduction) {
      stream = stream
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.if(options['fail-after-error'], $.eslint.failAfterError()));
    }
    stream
      .pipe($.babel({
        presets: [['@babel/preset-env', { modules: false }]],
      }))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.js')))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest, { sourcemaps: options.sourcemaps }))
      .pipe($.if(options.minify, $.uglifyEs.default()))
      .pipe($.if(options.minify, $.rename({ suffix: '.min' })))
      .pipe($.if(options.minify, gulp.dest(pkg.gulpPaths.scripts.dest)))
      .pipe($.touchCmd());

    if (!isProduction) {
      stream = stream.pipe($.livereload());
    }
    return stream;
  };

  registerTaskWithProductionMode(gulp, 'scripts', scriptTask);
};
