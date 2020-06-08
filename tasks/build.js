'use strict';

module.exports = (gulp, $, pkg) => {
  const buildTasks = [
    typeof(pkg.gulpPaths.fonts) === 'undefined' ? '' : 'fonts',
    typeof(pkg.gulpPaths.icons) === 'undefined' ? '' : 'icons',
    typeof(pkg.gulpPaths.scripts) === 'undefined' ? '' : 'scripts',
    typeof(pkg.gulpPaths.styles) === 'undefined' ? '' : 'styles'
  ];

  // @task: Build all static assets.
  gulp.task('build', gulp.series(
    'clean',
    'images',
    gulp.parallel(buildTasks.filter(Boolean))
  ));

  const productionBuildTasks = [
    typeof(pkg.gulpPaths.fonts) === 'undefined' ? '' : 'fonts',
    typeof(pkg.gulpPaths.icons) === 'undefined' ? '' : 'icons',
    typeof(pkg.gulpPaths.scripts) === 'undefined' ? '' : 'scripts:production',
    typeof(pkg.gulpPaths.styles) === 'undefined' ? '' : 'styles:production'
  ];

  // @task: Build and minify all static assets.
  gulp.task('build:production', gulp.series(
    'clean',
    'images',
    gulp.parallel(productionBuildTasks.filter(Boolean))
  ));
}
