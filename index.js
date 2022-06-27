'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')({
    maintainScope: false,
    overridePattern: false,
    pattern: [
      '@netzstrategen/twig-asset',
      'del',
      'minimist',
      'node-sass-magic-importer',
      'path',
      'vinyl-named',
      'webpack',
      'webpack-stream',
    ],
    rename: {
      '@netzstrategen/twig-asset': 'twigAsset',
      'node-sass-magic-importer': 'magicImporter',
      'vinyl-named': 'named',
      'webpack-stream': 'webpackStream',
    }
  });

  let tasks = [
    'clean',
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
