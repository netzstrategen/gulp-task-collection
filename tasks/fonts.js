'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Copy fonts to dist.
  const task = async () => {
    if (!pkg.gulpPaths.fonts.src) { return false }
    return gulp.src(pkg.gulpPaths.fonts.src)
      .pipe(gulp.dest(pkg.gulpPaths.fonts.dest))
      .pipe($.touchCmd());
  };

  gulp.task('fonts', task);
};
