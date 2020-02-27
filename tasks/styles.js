'use strict';

module.exports = (gulp, $, pkg) => {
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
  const task = async (args) => {
    if (!pkg.gulpPaths.styles.src) { return false }
    const options = Object.assign($.minimist(process.argv.slice(2), {
      string: ['outputStyle'],
      boolean: ['concat', 'sourcemaps', 'production', 'fail-after-error'],
      default: { concat: true },
    }), args);
    return gulp.src(pkg.gulpPaths.styles.src)
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe($.stylelint({
        failAfterError: options['fail-after-error'],
        syntax: 'scss',
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
      .pipe($.if(options.sourcemaps, $.sourcemaps.init()))
      .pipe($.sass({
        importer: $.magicImporter({
          disableImportOnce: true
        }),
        outputStyle: options.outputStyle
      }).on('error', reportError))
      .pipe($.autoprefixer())
      .pipe($.if(options.sourcemaps, $.sourcemaps.write()))
      .pipe($.if(options.production, $.replace(copyrightPlaceholder, copyrightNotice)))
      .pipe($.if(options.production, $.cleanCss(cleanCssOptions)))
      .pipe($.if(options.production, $.rename({ suffix: '.min' })))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.css')))
      .pipe($.cssUrlCustomHash({
        targetFileType: ['jpe?g', 'png', 'webp', 'svg', 'gif', 'ico', 'otf', 'ttf', 'eot', 'woff2?'],
      }))
      .pipe(gulp.dest(pkg.gulpPaths.styles.dest))
      .pipe($.livereload());
  };

  gulp.task('styles', task);
  gulp.task('styles:production', () => task({
    outputStyle: 'compressed',
    sourcemaps: false,
    production: true,
  }));
};
