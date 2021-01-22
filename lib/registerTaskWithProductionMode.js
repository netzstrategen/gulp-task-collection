const productionDefaults = {
  minify: true,
};

const developmentDefaults = {
  sourcemaps: true,
};

module.exports = (gulp, taskName, task) => {
  gulp.task(taskName, () => task(developmentDefaults));
  gulp.task(`${taskName}:production`, () => task(productionDefaults));
}
