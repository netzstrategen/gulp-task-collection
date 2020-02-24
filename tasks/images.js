'use strict';

module.exports = (gulp, $, pkg) => {

  const touch = require('gulp-touch-cmd');

  // @task: Process and minify images.
  const task = async () => {
    if (!pkg.gulpPaths.images.src) { return false }
    return gulp.src(pkg.gulpPaths.images.src)
      .pipe($.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.jpegtran({ progressive: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        $.imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
      ]))
      .pipe(gulp.dest(pkg.gulpPaths.images.dest));
      .pipe(touch());
  };

  gulp.task('images', task);
};
