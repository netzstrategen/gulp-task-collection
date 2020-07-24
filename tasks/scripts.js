'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');

module.exports = (gulp, $, pkg) => {

  // @task: Build JS from components.
  function scriptTask(opts) {
    if (!pkg.gulpPaths.scripts.src) { return false }
    const options = getOptions($, pkg.gulpPaths.scripts.options, opts);
    return gulp.src(pkg.gulpPaths.scripts.src)
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(options['fail-after-error'], $.eslint.failAfterError()))
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.babel({
        presets: [['@babel/preset-env', { modules: false }]],
      }))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.js')))
      .pipe($.if(options.sourcemaps, $.sourcemaps.write()))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest))
      .pipe($.if(options.minify, $.uglifyEs.default()))
      .pipe($.if(options.minify, $.rename({ suffix: '.min' })))
      .pipe($.if(options.minify,gulp.dest(pkg.gulpPaths.scripts.dest)))
      .pipe($.touchCmd())
      .pipe($.livereload());
  };

  registerTaskWithProductionMode(gulp, 'scripts', scriptTask);
};
