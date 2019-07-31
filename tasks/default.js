'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Watch files for changes and reload.
  const watch = (callback) => {
    // Fractal automatically detects existing server instance.
    $.livereload.listen();
    gulp.watch(pkg.gulpPaths.fonts.src, gulp.series('fonts'));
    gulp.watch(pkg.gulpPaths.images.src, gulp.series('images'));
    gulp.watch(pkg.gulpPaths.styles.src, gulp.series('styles'));
    gulp.watch(pkg.gulpPaths.scripts.src, gulp.series('scripts'));
    gulp.watch(pkg.gulpPaths.templates, (files) => {
      $.livereload.changed(files);
    });
    callback(); // Required to stop Gulp throwing async competion error.
  };

  let defaultTasks = [
    typeof(pkg.gulpPaths.fractalConfig) === 'undefined' ? '' : 'fractal:start',
    'fonts',
    'images',
    'styles',
    'scripts'
  ];
  defaultTasks = defaultTasks.filter(Boolean);

  // @task: Default. Start Fractal and watch for changes.
  gulp.task('default', gulp.series(gulp.parallel(defaultTasks), watch));
}
