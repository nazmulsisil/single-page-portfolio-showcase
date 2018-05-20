const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const del = require('del');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

gulp.task('previewDocs', () => {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('deleteDocs', () => {
  return del(['./docs/*']);
});

gulp.task('optimizeImages', ['deleteDocs'], () => {
  return gulp
    .src('./public/img/**.*')
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        multipass: true
      })
    )
    .pipe(gulp.dest('./docs/img'));
});

gulp.task('usemin', ['styles-final', 'bundleScript'], () => {
  return gulp
    .src('./public/index.html')
    .pipe(
      usemin({
        css: [() => rev(), () => cssnano()],
        js: [() => rev(), () => uglify()]
      })
    )
    .pipe(gulp.dest('./docs'));
});

gulp.task('copyGeneralFiles', ['deleteDocs'], () => {
  const pathsToCopy = [
    // './public/sounds/**.*'
    './public/**/*',
    '!./public/index.html',
    '!./public/img',
    '!./public/img/**',
    '!./public/img/**.*',
    '!./public/styles',
    '!./public/styles/**.*',
    '!./public/scripts',
    '!./public/scripts/**.*'
  ];

  return gulp.src(pathsToCopy).pipe(gulp.dest('./docs/'));
});

gulp.task('useminTrigger', ['deleteDocs'], () => {
  gulp.start('usemin');
});

gulp.task('build', [
  'deleteDocs',
  'copyGeneralFiles',
  'optimizeImages',
  'useminTrigger'
]);
