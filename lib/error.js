// Error notifications with notify. Shows a banner on macOS.
let notify = require('gulp-notify');

module.exports = (error) => {
  notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
};
