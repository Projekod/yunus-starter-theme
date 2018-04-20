const gulp = require('gulp');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const imageMin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const cleanCSS = require('gulp-clean-css');
const remove = require('gulp-rm');
const fileExists = require('file-exists');

const config = require('./config.json');

gulp.task('browserSync', function () {
    browserSync({
        proxy: config.devUrl,
        options: {
            reloadDelay: 250
        },
        notify: true
    });
});

gulp.task('css', function () {
    return gulp.src(config.cssFiles)
        .pipe(plumber())
        .pipe(concat('build.css'))
        .pipe(gulp.dest('build/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function () {
    return gulp.src(config.jsFiles)
        .pipe(plumber())
        .pipe(concat('build.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('build/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
    return gulp.src(['src/sass/style.scss'])
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass({
            errLogToConsole: true,
            includePaths: [
                'src/sass'
            ]
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch("./**/*.twig").on('change', browserSync.reload);
    gulp.watch("./**/*.php").on('change', browserSync.reload);
});

gulp.task('default', ['scripts', 'sass', 'watch','browserSync']);