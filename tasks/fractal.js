'use strict';

module.exports = (gulp, $, pkg) => {
  const path = require('path');
  const fractal = require(path.resolve(pkg.gulpPaths.fractalConfigFilePath));
  // @task: Start Fractal server.
  start: {
    const task = () => {
      let server = fractal.web.server({
        sync: true
      });
      let logger = fractal.cli.console; // keep a reference to the fractal CLI console utility
      server.on('error', err => logger.error(err.message));
      return server.start().then(() => {
        logger.success(`Fractal server is now running at ${server.url}`);
      });
    };

    gulp.task('fractal:start', task);
  };
  // @task: Export static Fractal library.
  build: {
    const task = () => {
      let builder = fractal.web.builder();
      let logger = fractal.cli.console; // keep a reference to the fractal CLI console utility
      builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
      builder.on('error', err => logger.error(err.message));
      return builder.build().then(() => logger.success('Fractal build completed!'));
    };

    gulp.task('fractal:build', task);
  };
};
