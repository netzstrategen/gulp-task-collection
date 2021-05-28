'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Watch files for changes and reload.
  const watch = (callback) => {
    // Fractal automatically detects existing server instance.
    $.livereload.listen();
    const tasks = [
     'fonts',
     'icons',
     'images',
     'styles',
     'scripts',
    ];
    tasks.forEach((task) => {
      const path = pkg.gulpPaths?.[task]?.src;
      if (path) {
        gulp.watch(path, gulp.series(task));
      }
    });
    if (pkg.gulpPaths?.templates) {
      gulp.watch(pkg.gulpPaths.templates, (files) => {
        $.livereload.changed(files);
      });
    }
    callback(); // Required to stop Gulp throwing async competion error.
  };

  let defaultTasks = [
    typeof(pkg.gulpPaths.fractalConfig) === 'undefined' ? '' : 'fractal:start',
    typeof(pkg.gulpPaths.fonts) === 'undefined' ? '' : 'fonts',
    typeof(pkg.gulpPaths.icons) === 'undefined' ? '' : 'icons',
    typeof(pkg.gulpPaths.styles) === 'undefined' ? '' : 'styles',
    typeof(pkg.gulpPaths.scripts) === 'undefined' ? '' : 'scripts',
  ];
  defaultTasks = defaultTasks.filter(Boolean);

  // @task: Default. Start Fractal and watch for changes.
  gulp.task('default', gulp.series('images', gulp.parallel(defaultTasks), watch));
}
