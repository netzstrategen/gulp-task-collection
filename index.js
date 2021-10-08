'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')({
    overridePattern: false,
    pattern: [
      'del',
      'minimist',
      'path',
      'node-sass-magic-importer',
      '*/twig-asset'
    ],
    rename: {
      'gulp-eslint7': 'eslint',
      'node-sass-magic-importer': 'magicImporter',
      '@netzstrategen/twig-asset': 'twigAsset'
    }
  });

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
