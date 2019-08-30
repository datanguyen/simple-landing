'use strict'

const gulp = require('gulp')
const sass = require('gulp-sass')
const sourceMap = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

const cleanCSS = require('gulp-clean-css')
const htmlMin = require('gulp-htmlmin')
const imageMin = require('gulp-imagemin')
const fontMin = require('gulp-fontmin')

gulp.task('sass', () => {
  return gulp.src('./public/sass/**/*.scss')
    .pipe(sourceMap.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourceMap.write('./'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream())
})

gulp.task('serve', ['sass'], () => {
  browserSync.init({
    server: './public'
  })

  gulp.watch('./public/sass/**/*.scss', ['sass'])
  gulp.watch('./public/**/*.html').on('change', browserSync.reload)
})

gulp.task('build', ['sass'], () => {
  gulp.src('public/css/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))

  gulp.src('public/index.html')
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'))

  gulp.src('public/images/*.png')
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images'))

  gulp.src('public/fonts/**')
    .pipe(fontMin())
    .pipe(gulp.dest('dist/fonts'))
})
