var gulp = require('gulp');
var mainBowerFiles = require('main-bower-files');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var filter = require('gulp-filter');
var flatten= require('gulp-flatten');
var replace= require('gulp-replace');
 
gulp.task('assets', function() {
    return gulp.src(['bower_components/**/*'], {
        base: './bower_components'
    })
    .pipe(filter([
        '**/*.{png,gif,svg,jpeg,jpg,woff,woff2,eot,ttf}'
    ]))
    .pipe(flatten({ includeParents: -1}))
    .pipe(gulp.dest('./public/libraries/'));
});
 
gulp.task('js', function() {
    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/libraries/'));
});
 
gulp.task('css', function() {
    gulp.src(mainBowerFiles('**/*.{css,scss}', {
            overrides: {
                bootstrap: {
                    main: [
                        './dist/css/bootstrap.min.css'
                    ]
                }
            }
        }))
        .pipe(concat('all.min.css'))
        .pipe(replace('../fonts', './fonts'))
        .pipe(minify())
        .pipe(gulp.dest('./public/libraries/'));
});
 
 
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['assets', 'js', 'css']);