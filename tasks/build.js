'use strict';

module.exports = (gulp, $, pkg) => {
  const buildTasks = [
    'clean',
    'images',
    typeof(pkg.gulpPaths.fonts) === 'undefined' ? '' : 'fonts',
    typeof(pkg.gulpPaths.icons) === 'undefined' ? '' : 'icons',
    typeof(pkg.gulpPaths.scripts) === 'undefined' ? '' : 'scripts',
    typeof(pkg.gulpPaths.styles) === 'undefined' ? '' : 'styles'
  ];

  // @task: Build all static assets.
  gulp.task('build', gulp.series(buildTasks.filter(Boolean)));

  const productionBuildTasks = [
    'clean',
    'images',
    typeof(pkg.gulpPaths.fonts) === 'undefined' ? '' : 'fonts',
    typeof(pkg.gulpPaths.icons) === 'undefined' ? '' : 'icons',
    typeof(pkg.gulpPaths.scripts) === 'undefined' ? '' : 'scripts:production',
    typeof(pkg.gulpPaths.styles) === 'undefined' ? '' : 'styles:production'
  ];

  // @task: Build and minify all static assets.
  gulp.task('build:production', gulp.series(productionBuildTasks.filter(Boolean)));
}
