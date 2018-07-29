var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var notify = require('gulp-notify');

function handleError(error) {
    console.log(error.toString())
    this.emit('end')
}

gulp.task('sass', function () {
    return gulp.src('./*.scss')
        .pipe(sass())
        .on('error', handleError)
        .pipe(autoprefixer())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./*.scss', ['sass']);
});

gulp.task('serve', ['sass'], function () {
    browserSync.init({
        proxy: "localhost:8888"
    });
    gulp.watch("*.scss").on('change', browserSync.reload);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("*.js").on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'watch', 'serve']);
