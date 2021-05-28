'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')();
  // Manually add required plugins to $ plugins object.
  $.del = require('del');
  $.eslint = require('gulp-eslint7');
  $.minimist = require('minimist');
  $.path = require('path');
  $.magicImporter = require('node-sass-magic-importer');
  $.twigAsset = require('@netzstrategen/twig-asset')();

  let tasks = [
    'clean',
    typeof(pkg.gulpPaths.fractalConfig) === 'undefined' ? '' : 'fractal',
    'fonts',
    'icons',
    'images',
    'scripts',
    'styles',
    'build',
    'default',
  ];
  tasks = tasks.filter(Boolean);
  for (let task of tasks) {
    require('./tasks/' + task)(gulp, $, pkg);
  }
};
