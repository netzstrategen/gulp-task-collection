'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');
const webpackConfig = require('../lib/webpack.config');

module.exports = (gulp, $, pkg) => {

  // @task: Build JS from components.
  function scriptTask(opts) {
    if (!pkg.gulpPaths.scripts.src) { return false }
    const options = getOptions($, pkg.gulpPaths.scripts.options, opts);
    const tmp = {};

    return gulp
      .src(pkg.gulpPaths.scripts.src)
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe($.if(!options.concat, $.named()))
      .pipe(
        $.if(
          !options.concat,
          $.rename(path => (tmp[path.basename] = path))
        )
      )
      .pipe(
        $.webpackStream(
          {
            ...webpackConfig,
            optimization: {
              minimize: false
            }
          },
          $.webpack
        )
      )
      .pipe($.rename(path => (path.dirname = tmp[path.basename].dirname)))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest))
      .pipe($.if(!options.concat && options.minify, $.named()))
      .pipe(
        $.if(
          !options.concat && options.minify,
          $.rename(path => (tmp[path.basename] = path))
        )
      )
      .pipe($.if(options.minify, $.webpackStream(webpackConfig, $.webpack)))
      .pipe(
        $.if(
          !options.concat && options.minify,
          $.rename(path => {
            path.dirname = tmp[path.basename]?.dirname || '.';
            path.basename = `${path.basename}.min`;
          })
        )
      )
      .pipe($.if(options.minify, gulp.dest(pkg.gulpPaths.scripts.dest)))
      .pipe($.touchCmd());
  };

  registerTaskWithProductionMode(gulp, 'scripts', scriptTask);
};
