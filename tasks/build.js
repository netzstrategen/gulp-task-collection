'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build all static assets.
  gulp.task('build', gulp.series('clean', 'images', gulp.parallel(
    'fonts',
    'icons',
    'scripts',
    'styles'
  )));

  // @task: Build and minify all static assets.
  gulp.task('build:production', gulp.series('clean', 'images', gulp.parallel(
    'fonts',
    'icons',
    'scripts:production',
    'styles:production'
  )));
}
