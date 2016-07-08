//usage:https://webpack.github.io/docs/usage-with-gulp.html
import gulp from 'gulp';
import babel from 'gulp-babel';
import gutil from 'gulp-util';
import watch from 'gulp-watch';
import gulpWebpack from 'gulp-webpack';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import livereload  from 'gulp-livereload';

gulp.task('transform',()=>{

  return gulp.src('./public/js/test/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./public/js/dest/'))
    .pipe(livereload());
})

gulp.task("webpack", function() {
    return gulp.src('./public/js/entry.js')
        .pipe(gulpWebpack(webpackConfig))
        .pipe(gulp.dest('./public/js/build'))
        .pipe(livereload());
});

// gulp.task("webpack-dev-server", function(callback) {
//     // Start a webpack-dev-server
//     var myConfig = Object.create(webpackConfig);
//         myConfig.devtool = 'eval';
//         myConfig.debug = true;
//     new webpackDevServer(webpack(myConfig), {
//         // server and middleware options
//     }).listen(8080, "localhost", function(err) {
//         if(err) throw new gutil.PluginError("webpack-dev-server", err);
//         // Server listening
//         gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//
//         // keep the server alive or continue?
//         // callback();
//     });
// });

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(['./public/js/src/**/*.js',
        './public/js/reflux/*.js',
        './public/js/entry.js',
        './webpack.config.js',
        '!public/js/build/main.js'], ['webpack']);
});

gulp.task('default', [
    'webpack',
    'watch'
]);
