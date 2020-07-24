const productionDefaults = {
  minify: true,
  sourcemaps: false,
};

module.exports = (task) => {
  return () => task(productionDefaults);
}
