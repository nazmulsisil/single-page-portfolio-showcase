var gulp = require("gulp"),
  watch = require("gulp-watch"),
  browsersync = require("browser-sync").create();

gulp.task("watch", watchAll);

function watchAll() {
  browsersync.init({
    notify: false,
    server: {
      baseDir: "public"
    }
  });

  watch("./public/index.html", function() {
    browsersync.reload();
  });

  watch(
    [
      "./src/styles/**/*.css",
      "./src/styles/**/*.scss",
      "./src/styles/**/*.sass"
    ],
    function() {
      gulp.start("cssInject");
    }
  );
}

gulp.task("cssInject", ["styles-final"], function() {
  console.log("i m from cssInject");

  gulp.src("./public/styles/style.css").pipe(browsersync.stream());
});

// var gulp = require("gulp"),
//   watch = require("gulp-watch"),
//   browsersync = require("browser-sync").create();

// gulp.task("watch", function() {
//   browsersync.init({
//     notify: false,
//     server: {
//       baseDir: "app"
//     }
//   });

//   watch("./app/index.html", function() {
//     browsersync.reload();
//   });

//   watch("./app/assets/styles/**/*.css", function() {
//     gulp.start("cssInject");
//   });

//   watch("./app/assets/scripts/**/*.js", function() {
//     gulp.start("scriptRefresh");
//   });
// });

// gulp.task("cssInject", ["styles"], function() {
//   gulp.src("./app/temp/styles/styles.css").pipe(browsersync.stream());
// });

// gulp.task("scriptRefresh", ["jsBundled"], function() {
//   browsersync.reload();
// });
