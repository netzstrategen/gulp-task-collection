'use strict';

const getOptions = require('../lib/getOptions');
const registerTaskWithProductionMode = require('../lib/registerTaskWithProductionMode');
const path = require('path');

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
        all: false,
        mergeAdjacentRules: true, // controls adjacent rules merging; defaults to true
        mergeIntoShorthands: true, // controls merging properties into shorthands; defaults to true
        mergeMedia: true, // controls `@media` merging; defaults to true
        mergeNonAdjacentRules: true, // controls non-adjacent rule merging; defaults to true
        mergeSemantically: false, // controls semantic merging; defaults to false
        overrideProperties: true, // controls property overriding based on understandability; defaults to true
        removeEmpty: true, // controls removing empty rules and nested blocks; defaults to `true`
        reduceNonAdjacentRules: true, // controls non-adjacent rule reducing; defaults to true
        removeDuplicateFontRules: true, // controls duplicate `@font-face` removing; defaults to true
        removeDuplicateMediaBlocks: true, // controls duplicate `@media` removing; defaults to true
        removeDuplicateRules: true, // controls duplicate rules removing; defaults to true
        removeUnusedAtRules: false, // controls unused at rule removing; defaults to false (available since 4.1.0)
        restructureRules: false, // controls rule restructuring; defaults to false
        skipProperties: [] // controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
      }
    }
  };

  // @task: Build Sass styles from components.
  function styleTask(opts) {
    if (!pkg.gulpPaths.styles.src) { return false }
    const options = getOptions($, pkg.gulpPaths.styles.options, opts);
    return gulp.src(pkg.gulpPaths.styles.src, { sourcemaps: options.sourcemaps })
      .pipe($.if(!options['fail-after-error'], $.plumber()))
      .pipe($.stylelint({
        failAfterError: options['fail-after-error'],
        syntax: 'scss',
        reporters: [{
          formatter: 'string',
          console: true
        }]
      }))
      .pipe($.sass({
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
          return path.basename($.twigAsset.asset(filePath));
        },
        targetFileType: ['jpe?g', 'png', 'webp', 'svg', 'gif', 'ico', 'otf', 'ttf', 'eot', 'woff2?'],
      }))
      .pipe(gulp.dest(pkg.gulpPaths.styles.dest, { sourcemaps: options.sourcemaps }))
      .pipe($.if(options.minify, $.cleanCss(cleanCssPluginOptions)))
      .pipe($.if(options.minify, $.rename({ suffix: '.min' })))
      .pipe($.if(options.minify, gulp.dest(pkg.gulpPaths.styles.dest)))
      .pipe($.touchCmd())
      .pipe($.livereload());
  };

  registerTaskWithProductionMode(gulp, 'styles', styleTask);
};
