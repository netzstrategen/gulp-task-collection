'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build all static assets.
  gulp.task('build', gulp.series('clean', gulp.parallel(
    'images',
    'scripts',
    'styles'
  )));

  // @task: Build and minify all static assets.
  gulp.task('build:production', gulp.series('clean', gulp.parallel(
    'images',
    'scripts:production',
    'styles:production'
  )));
}
