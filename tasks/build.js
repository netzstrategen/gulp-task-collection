'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build and minify all static assets.
  gulp.task('build', gulp.series('clean', gulp.parallel(
    'images',
    'scripts:build',
    'styles:build'
  )));
}
