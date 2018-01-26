'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build JS from components.
  const task = (options = {}) => {
    return gulp.src(pkg.gulpPaths.scripts.src)
      .pipe($.plumber())
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.js'))
      .pipe($.if(options.sourcemaps, $.sourcemaps.write()))
      .pipe($.if(options.production, $.uglifyEs.default()))
      .pipe($.if(options.production, $.rename({ suffix: '.min' })))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest))
      .pipe($.livereload());
  };

  gulp.task('scripts', task);
  gulp.task('scripts:build', () => task({
    sourcemaps: false,
    production: true,
  }));
};
