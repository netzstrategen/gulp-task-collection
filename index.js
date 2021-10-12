'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')({
    maintainScope: false,
    overridePattern: false,
    pattern: [
      'del',
      'minimist',
      'path',
      'node-sass-magic-importer',
      '@netzstrategen/twig-asset'
    ],
    rename: {
      'node-sass-magic-importer': 'magicImporter',
      '@netzstrategen/twig-asset': 'twigAsset'
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
