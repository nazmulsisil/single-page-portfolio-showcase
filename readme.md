steps to set up the boilerplate

<!-- ===== node-sass ====== -->

<!-- === End node-sass === -->

~~~~DONE~~~~

node-sass
[no dependency]
node-sass: take files
from ./src/styles/sass/main.scss
to ./temp/styles/from_sass.css
notes: completed and added script in package.json file which will automatically combine all files into a single file called "main.scss" and then convert that file to regular css file named "from_sass.css", but still live-server is not detecting css file changes because css files hasnt been transported to public folder where live-server is pointing to. So gulp task will do it, or concat will do it.

~~~~TO DO~~~~

gulp
[no-dependency]

post-css
[gulp]
gulp-post-css: takes files
from src/styles/postcss/main.css
to ./temp/styles/from_postcss.css
