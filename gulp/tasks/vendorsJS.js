const gulp = require('gulp');
const concat = require('gulp-concat');

const vendorsScripts = [
  'node_modules/svg4everybody/dist/svg4everybody.min.js',
  'dev/static/js/vendor/jquery-3.3.1.min.js',
  'dev/static/js/vendor/dynamic_adapt.js',
  'dev/static/js/vendor/rateyo.js',
  'node_modules/simplebar/dist/simplebar.js',
  'node_modules/chart.js/dist/Chart.js',
  'dev/static/js/vendor/tippy.js',
];

module.exports = function vendors(cb) {
  return vendorsScripts.length
    ? gulp.src(vendorsScripts)
      .pipe(concat('libs.js'))
      .pipe(gulp.dest('dist/static/js/'))
    : cb();
};
