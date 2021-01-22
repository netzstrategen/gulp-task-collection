const productionDefaults = {
  minify: true,
};

module.exports = (gulp, taskName, task) => {
  gulp.task(taskName, task);
  gulp.task(`${taskName}:production`, () => task(productionDefaults));
}
