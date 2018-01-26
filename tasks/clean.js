'use strict';

module.exports = (gulp, $, config) => {
  // @task: Delete /dist directory.
  const task = () => $.del(config.paths.destDir);

  gulp.task('clean', task);
}
