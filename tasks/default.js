'use strict';

module.exports = (gulp, $, config) => {
  // @task: Watch files for changes and reload.
  const watch = (callback) => {
    // Fractal automatically detects existing server instance.
    $.livereload.listen();
    gulp.watch(config.paths.styles.src, gulp.series('styles'));
    gulp.watch(config.paths.scripts.src, gulp.series('scripts'));
    gulp.watch(config.paths.templates, (files) => {
      $.livereload.changed(files);
    });
    callback(); // Required to stop Gulp throwing async competion error.
  };

  // @task: Default. Start Fractal and watch for changes.
  gulp.task('default', gulp.series(gulp.parallel(
    'fractal:start',
    'styles',
    'scripts'
  ), watch));
}
