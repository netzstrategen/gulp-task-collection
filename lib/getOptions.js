/**
 * Options to be passed to minimist
 */
const availableOptions = {
  boolean: [
    'concat',
    'sourcemaps',
    'minify',
    'fail-after-error',
  ],
  default: { concat: true },
};

module.exports = ($, ...opts) => {
  return Object.assign($.minimist(process.argv.slice(2), availableOptions), ...opts);
}
