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

  watch("./src/scripts/**/*.js", function() {
    gulp.start("refreshAfterBundling");
  });
}

gulp.task("cssInject", ["styles-final"], function() {
  console.log("i m from cssInject");

  gulp.src("./public/styles/style.css").pipe(browsersync.stream());
});

gulp.task("refreshAfterBundling", ["bundleScript"], function() {
  browsersync.reload();
});
