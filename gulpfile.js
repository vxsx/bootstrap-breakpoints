var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function () {
    gulp.src('src/*.js')
        .pipe(jscs()).on('error', function (error) {
            gutil.log('\n' + error.message);
        })
        .pipe(jshint());
});

gulp.task('demo', function () {
    gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ff > 24']
        }))
        .pipe(gulp.dest('css/'));
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['default']);
    gulp.watch('scss/*.scss', ['demo']);
});
