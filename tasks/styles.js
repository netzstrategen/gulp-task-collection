'use strict';

module.exports = (gulp, $, config) => {
  const pkg = require($.path.resolve('./package.json'));
  const reportError = require('../lib/error.js');

  // Copyright notice placed at top of compiled CSS
  const copyrightPlaceholder = '/*! #copyright DO NOT REMOVE# */';
  const copyrightNotice = ['/*!',
    ' * ' + pkg.title + ' - ' + pkg.description,
    ' * @version v' + pkg.version,
    ' * @link ' + pkg.homepage,
    ' * @author ' + pkg.author,
    ' */',
    ''].join('\n');

  // Settings for clean-css plugin
  const cleanCssOptions = {
    level: {
      2: {
        all: true,
      }
    }
  };

  // @task: Build Sass styles from components.
  const task = (options = {}) => {
    return gulp.src(config.paths.styles.src, { base: config.paths.styles.srcDir })
      .pipe($.plumber())
      .pipe($.stylelint({
        syntax: 'scss',
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
      .pipe($.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.scss'))
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass({
        importer: $.sassModuleImporter(),
        outputStyle: options.outputStyle
      }).on('error', reportError))
      .pipe($.autoprefixer(pkg.browserslist))
      .pipe($.if(options.sourcemaps, $.sourcemaps.write()))
      .pipe($.if(options.production, $.replace(copyrightPlaceholder, copyrightNotice)))
      .pipe($.if(options.production, $.cleanCss(cleanCssOptions)))
      .pipe($.if(options.production, $.rename({ suffix: '.min' })))
      .pipe(gulp.dest($.path.join(config.paths.destDir, config.paths.styles.dest)))
      .pipe($.livereload());
  };

  gulp.task('styles', task);
  gulp.task('styles:build', () => task({
    outputStyle: 'compressed',
    sourcemaps: false,
    production: true,
  }));
};
