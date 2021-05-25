var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var spawn = require('child_process').spawn;
var node;


function server(cb) {
    if (node) node.kill()
    node = spawn('node', ['-r', 'dotenv/config', './bin/www'], {stdio: 'inherit'})
    node.on('close', function (code) {
      if (code === 8) {
        gulp.log('Error detected, waiting for changes...');
      }
    });
    cb()
}

function css(cb) {
    gulp.src("public/**/*.css")
        .pipe(browserSync.stream());
    cb()
}

function defaultTask(cb) {
    browserSync.init({
        port: 5000, 
        proxy: {
            target: "localhost:3000",
            ws: true
        }
    });

    gulp.watch(["app.js", "./bin/www", "./routes/*.js", "./socket/*.js"], server);
    gulp.watch(["views/**/*.ejs", "public/**/*.js"]).on('change', browserSync.reload);
    gulp.watch(["public/**/*.css"], css);

    cb();
}

process.on('exit', function() {
    if (node) node.kill()
})
  
exports.default = gulp.series(server, defaultTask)