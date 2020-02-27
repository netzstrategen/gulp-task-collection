'use strict';

module.exports = (gulp, $, pkg) => {
  // @task: Take directory of SVGs and export as sprite ready for inline xlink use.
  const task = async () => {
    if (!pkg.gulpPaths.icons.src) { return false }
    return gulp.src(pkg.gulpPaths.icons.src)
      .pipe($.svgSprite({
        mode: {
          symbol: {
            dest: '',
            inline: true,
            sprite: pkg.gulpPaths.icons.distFilename,
          },
        },
        svg: {
          transform: [
            function(svg) {
              svg = svg.replace('style="position:absolute"', 'style="position:absolute;width:0;height:0;overflow:hidden;" aria-hidden="true"');
              return svg;
            },
          ],
        },
      }))
      .pipe(gulp.dest(pkg.gulpPaths.icons.dest));
  };

  gulp.task('icons', task);
};
