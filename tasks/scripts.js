'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Build JS from components.
  const task = (args = {}) => {
    const options = Object.assign($.minimist(process.argv.slice(2), {
      boolean: ['concat', 'sourcemaps', 'production', 'fail-after-error'],
      default: { concat: true },
    }), args);
    return gulp.src(pkg.gulpPaths.scripts.src)
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(options['fail-after-error'], $.eslint.failAfterError()))
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.babel({
        presets: ['@babel/preset-env']
      }))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.js')))
      .pipe($.if(options.sourcemaps, $.sourcemaps.write()))
      .pipe($.if(options.production, $.uglifyEs.default()))
      .pipe($.if(options.production, $.rename({ suffix: '.min' })))
      .pipe(gulp.dest(pkg.gulpPaths.scripts.dest))
      .pipe($.livereload());
  };

  gulp.task('scripts', task);
  gulp.task('scripts:production', () => task({
    sourcemaps: false,
    production: true,
  }));
};
