const productionDefaults = {
  minify: true,
};

module.exports = (task) => {
  return () => task(productionDefaults);
}
