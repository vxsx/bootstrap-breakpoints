var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');

gulp.task('default', function () {
    return gulp.src('src/*.js')
        .pipe(jscs()).on('error', function (error) {
            gutil.log('\n' + error.message);
        })
        .pipe(jshint());
});

gulp.task('watch', function () {
    gulp.watch('src/*.js', ['default']);
});
