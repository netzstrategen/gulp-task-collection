'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Process and minify images.
  const minify = () => {
    return gulp.src(pkg.gulpPaths.images.src)
      .pipe($.imagemin([
        $.imagemin.gifsicle({ interlaced: true }),
        $.imagemin.mozjpeg({ progressive: true }),
        $.imagemin.optipng({ optimizationLevel: 5 }),
        $.imagemin.svgo({ plugins: [{ cleanupIDs: false }] })
      ]))
      .pipe(gulp.dest(pkg.gulpPaths.images.dest))
      .pipe($.touchCmd());
  };

  const inlineSvg = async () => {
    if (!pkg.gulpPaths.images.inlineSvgs === true) { return false }
    return gulp.src(pkg.gulpPaths.images.dest + '/**/*.svg')
      .pipe($.sassvg({
        outputFolder: pkg.gulpPaths.styles.srcDir + '/vendor'
      }));
  };
  gulp.task('images', gulp.series(minify, inlineSvg));
};
