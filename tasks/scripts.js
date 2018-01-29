'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build JS from components.
  const task = (args = {}) => {
    const options = Object.assign($.minimist(process.argv.slice(2), {
      boolean: ['concat', 'sourcemaps', 'production'],
      default: { concat: true },
    }), args);
    return gulp.src(pkg.gulpPaths.scripts.src)
      .pipe($.plumber())
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.js')))
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
