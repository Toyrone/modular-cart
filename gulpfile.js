var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'docs'
    }
  })

})

gulp.task('images', function() {
  gulp.src('docs/img/**/*.+(png|jpg|svg|gif)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('docs/assets/img/output'))
})

gulp.task('sass', function() {
  gulp.src('docs/assets/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('docs/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('default', ['browserSync', 'sass', 'images'], function() {
  gulp.watch('docs/assets/scss/**/*.scss', ['sass'] );
  gulp.watch('docs/*.html').on('change', browserSync.reload);
  gulp.watch('docs/assets/js/**/*.js').on('change', browserSync.reload);
});
