'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');
const webpackConfig = require('../lib/webpack.config');

module.exports = (gulp, $, pkg) => {

  // @task: Build JS from components.
  function scriptTask(opts) {
    if (!pkg.gulpPaths.scripts.src) { return false }
    const options = getOptions($, pkg.gulpPaths.scripts.options, opts);

    return gulp
      .src(pkg.gulpPaths.scripts.src)
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe($.named())
      .pipe($.webpackStream(webpackConfig, $.webpack))
      .pipe($.rename({ suffix: '.min' }))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest))
      .pipe($.touchCmd());
  };

  registerTaskWithProductionMode(gulp, 'scripts', scriptTask);
};
