//BASIC GULP FILE SETUP
//-------------------------------------------------------------

//Include Gulp
var gulp             = require('gulp');

//General Plugins
var browserSync      = require('browser-sync').create();
var reload           = browserSync.reload;
var del              = require('del');
var watch            = require('gulp-watch');
var runSequence      = require('run-sequence');

//CSS Plugins
var sass             = require('gulp-sass');
var autoprefixer     = require('gulp-autoprefixer');
var csso             = require('gulp-csso');

//JS Plugins
var concat           = require('gulp-concat');
var uglify           = require('gulp-uglify');

//HTML Plugins
var minifyHTML       = require('gulp-minify-html');

//IMG Plugins


//-------------------------------------------------------------
//TASKS
//-------------------------------------------------------------

//Clean Public Folder
gulp.task('clean', function() {
    del(['public/**/*']);
});

//CSS Tasks
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(gulp.dest('public/css'));

});

//HTML Tasks
gulp.task('html', function () {
  return gulp.src(['./app/**/*.html'], {
            base: 'app'
        })
    .pipe(minifyHTML())
    .pipe(gulp.dest('public'))
    ;
});

//Image Tasks
gulp.task('image', function () {
  return gulp.src('app/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(gulp.dest('public/images'));

});

//JS Tasks
gulp.task('js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));

});


// Watch files for changes and rebuild public folder directory
gulp.task('watch', function() {
    // Watch HTML files
    gulp.watch('./app/*.html', ['html'], browserSync.reload);
    // Watch Sass files
    gulp.watch('./app/sass/**/*.scss', ['sass'], browserSync.reload);
    // Watch JS files
    gulp.watch('./app/js/**/*', ['js'], browserSync.reload);
    // Watch image files
    gulp.watch('./app/img/*', ['image'], browserSync.reload);
});


//Browser Sync Server
gulp.task('serve', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
    gulp.watch("./public/**/*").on("change", browserSync.reload);
});


//Build Function
//Run to add new files to watch tasks.
gulp.task('build', [], function(callback) {
  runSequence('clean',
              'sass',
              'html',
              'js',
              'image');
});

