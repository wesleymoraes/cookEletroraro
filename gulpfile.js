const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function build() {
  return gulp.src('./styles/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./styles/css'));
}

function watch() {
  gulp.watch('./styles/scss/*.scss', build);
  gulp.watch('./styles/scss/**/*.scss', build);
}

exports.watch = watch;
exports.build = build;