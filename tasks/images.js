'use strict';

module.exports = (gulp, $, config) => {
  // @task: Process and minify images.
  const task = () => {
    return gulp.src(config.paths.images.src)
      .pipe($.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.jpegtran({ progressive: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        $.imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
      ]))
      .pipe(gulp.dest($.path.join(config.paths.destDir, config.paths.images.dest)));
  };

  gulp.task('images', task);
};
