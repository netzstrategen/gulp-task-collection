'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')();
  // Manually add required plugins to $ plugins object.
  $.del = require('del');
  $.minimist = require('minimist');
  $.path = require('path');
  $.sassModuleImporter = require('sass-module-importer');

  let tasks = [
    'clean',
    typeof(pkg.gulpPaths.fractalConfig) === 'undefined' ? '' : 'fractal',
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
