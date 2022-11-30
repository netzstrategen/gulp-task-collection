'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');
const path = require('path');
const sass = require("gulp-sass")(require("sass"));

module.exports = (gulp, $, pkg) => {
  const reportError = require('../lib/error.js');

  // Copyright notice placed at top of compiled CSS
  const copyrightPlaceholder = '/*! #copyright DO NOT REMOVE# */';
  const copyrightNotice = [
    '/*!',
    ' *',
    ` * ${pkg.title} - ${pkg.description}`,
    ` * @version v${pkg.version}`,
    ` * @link ${pkg.homepage}`,
    ` * @author ${pkg.author}`,
    ' *',
    ' */',
  ].join('\n');

  const cleanCssPluginOptions = {
    level: {
      2: {
        all: true,
      }
    }
  };

  // @task: Build Sass styles from components.
  function styleTask(opts) {
    if (!pkg.gulpPaths.styles.src) { return false }
    const options = getOptions($, pkg.gulpPaths.styles.options, opts);

    let stream = gulp.src(pkg.gulpPaths.styles.src, { sourcemaps: options.sourcemaps })
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe(sass({
        importer: $.magicImporter({
          disableImportOnce: true
        }),
      }).on('error', reportError))
      .pipe($.autoprefixer({
        grid: 'autoplace'
      }))
      .pipe($.replace(copyrightPlaceholder, copyrightNotice))
      .pipe($.if(options.concat, $.concat(pkg.title.toLowerCase().replace(/[^a-z]/g,'') + '.css')))
      .pipe($.cssUrlCustomHash({
        customHash: (fileName, hash, filePath) => {
          return path.basename($.twigAsset().asset(filePath));
        },
        targetFileType: ['jpe?g', 'png', 'webp', 'svg', 'gif', 'ico', 'otf', 'ttf', 'eot', 'woff2?'],
      }))
      .pipe(gulp.dest(pkg.gulpPaths.styles.dest, { sourcemaps: options.sourcemaps }))
      .pipe($.if(options.minify, $.cleanCss(cleanCssPluginOptions)))
      .pipe($.if(options.minify, $.rename({ suffix: '.min' })))
      .pipe($.if(options.minify, gulp.dest(pkg.gulpPaths.styles.dest)))
      .pipe($.touchCmd());

    return stream;
  };

  registerTaskWithProductionMode(gulp, 'styles', styleTask);
};
