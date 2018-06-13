var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  forLoop = require('postcss-for'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssimport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  hexrgba = require('postcss-hexrgba'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass');

gulp.task('compile-postcss', compilePostcss);
gulp.task('compile-sass', compileSass);
gulp.task(
  'styles-final',
  ['compile-sass', 'compile-postcss'],
  concatSassAndPostcssAndMoveFinally
);

function concatSassAndPostcssAndMoveFinally() {
  return gulp
    .src(['./temp/styles/from_sass.css', './temp/styles/from_postcss.css'])
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public/styles/'));
}

function compileSass() {
  return gulp
    .src('./src/styles/sass/from_sass.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./temp/styles'));
}

function compilePostcss() {
  return gulp
    .src('./src/styles/postcss/from_postcss.css')
    .pipe(
      postcss([
        cssimport,
        forLoop,
        mixins,
        cssvars,
        hexrgba,
        nested,
        autoprefixer
      ])
    )
    .on('error', function(errorinfo) {
      console.log(errorinfo.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./temp/styles'));
}
