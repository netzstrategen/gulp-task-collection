'use strict';

module.exports = function (gulp) {
  const fs = require('fs');
  const path = require('path');
  const tasksPath = path.join(__dirname, 'tasks');
  const pkg = require(path.resolve('package.json'));
  const $ = require('gulp-load-plugins')();
  // Manually add required plugins to $ plugins object.
  $.del = require('del');
  $.minimist = require('minimist');
  $.path = require('path');
  $.sassModuleImporter = require('sass-module-importer');

  const tasks = [
    'clean',
    'fractal',
    'images',
    'scripts',
    'styles',
    // Tasks have to come last
    'build',
    'default',
  ];
  for (let task of tasks) {
    require('./tasks/' + task)(gulp, $, pkg);
  }
};
