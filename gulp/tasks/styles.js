var gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  nested = require("postcss-nested"),
  cssimport = require("postcss-import"),
  mixins = require("postcss-mixins"),
  hexrgba = require("postcss-hexrgba");

gulp.task("default", balFalaw);

function balFalaw() {
  console.log("ami bal falaisi");
}

gulp.task("compile-postcss", compilePostcss);

function compilePostcss() {
  return gulp
    .src("./src/styles/postcss/from_postcss.css")
    .pipe(postcss([cssimport, mixins, cssvars, hexrgba, nested, autoprefixer]))
    .pipe(gulp.dest("./temp/styles"));
}
