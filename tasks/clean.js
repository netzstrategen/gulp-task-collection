'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Delete /dist directory.
  const task = () => $.del(pkg.gulpPaths.destDir);

  gulp.task('clean', task);
}
