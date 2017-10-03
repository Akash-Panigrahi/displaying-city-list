'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync');


/*
 * Error handling mechanism that will
 * be logged in the console to solve.
 * */
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

/*
 * Sass gulp task that will get sass files from
 * source, output css in expanded format, 
 * handle any subsequent errors, 
 * autoprerfix for specific versions,
 * put the result in destination folder
 * and finally inject the css in the website
 * without the need for reloading
 * */
gulp.task('sass', function () {
    return gulp.src('_sass/main.sass')
          .pipe(sass({
              includePaths: ['_sass'],
              outputStyle: 'expanded'
          })
          .on('error', handleError))
          .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
          .pipe(gulp.dest('app/css'))
          .pipe(browserSync.reload({ stream: true }));
});

/*
 * browser-sync task that defines the base directory,
 * and makes sure notifications are false.
 * */
gulp.task('browser-sync', ['sass'], function () {
  browserSync({
      server: {
          baseDir: "./app"
      },
      notify: false
  });
});

gulp.task('browser-reload', function () {
    browserSync.reload();
});

/*
 * watch task that will watch for any changes in the
 * sass and jade files.
 * */
gulp.task('watch',['sass'], function () {
    gulp.watch('_sass/*.sass', ['sass']);
    gulp.watch(['app/*.html', 'app/_includes/*.html'], ['browser-reload']);
})

/*
 * default gulp task that will be executed by typing
 * 'npm run gulp' in the terminal window.
 * */
gulp.task('default', ['browser-sync', 'watch']);