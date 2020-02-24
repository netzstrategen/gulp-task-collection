'use strict';

const touch = require('gulp-touch-cmd');

module.exports = (gulp, $, pkg) => {
  // @task: Copy fonts to dist.
  const task = () => {
    return gulp.src(pkg.gulpPaths.fonts.src)
      .pipe(gulp.dest(pkg.gulpPaths.fonts.dest));
      .pipe(touch());
  };

  gulp.task('fonts', task);
};
