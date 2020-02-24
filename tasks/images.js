'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Process and minify images.
  const task = () => {
    return gulp.src(pkg.gulpPaths.images.src)
      .pipe($.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.jpegtran({ progressive: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        $.imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
      ]))
      .pipe(gulp.dest(pkg.gulpPaths.images.dest)),
      .pipe($.touchCmd());
  };

  gulp.task('images', task);
};
