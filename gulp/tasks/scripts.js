var gulp = require("gulp"),
  webpack = require("webpack");

var webpackConfig = "../../webpack.config.js";

gulp.task("bundleScript", function(callback) {
  webpack(require(webpackConfig), function(error, stat) {
    if (error) {
      console.log(error.toString());
    }

    console.log(stat.toString());
    callback();
  });
});
