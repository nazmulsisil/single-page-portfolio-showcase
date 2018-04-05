steps to set up the boilerplate

<!-- ===== node-sass ====== -->

<!-- === End node-sass === -->

~~~~DONE~~~~

node-sass
[no dependency]
node-sass: take files
from ./src/styles/sass/from_sass.scss
to ./temp/styles/from_sass.css
notes: completed and added script in package.json file which will automatically combine all files into a single file called "from_sass.scss" and then convert that file to regular css file named "from_sass.css", but still live-server is not detecting css file changes because css files hasnt been transported to public folder where live-server is pointing to. So gulp task will do it, or concat will do it.

gulp
[no-dependency]

post-css
[gulp]
gulp-post-css: takes files
from src/styles/postcss/from_postcss.css
to ./temp/styles/from_postcss.css
notes: completed postcss set up and compilation to a single file into temp folder. I used postcss nested, simple-vars, mixins, hexrgba, autoprefixer

take temp files and move to public folder

~~~~TO DO~~~~

* gulp-watch
* browsersync
* css injection
