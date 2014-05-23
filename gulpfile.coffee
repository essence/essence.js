#
gulp = require('gulp')
gutil = require('gulp-util')
coffee = require('gulp-coffee')
coffeelint = require('gulp-coffeelint')



# builds library files
gulp.task('default', () ->
  gulp
    .src('./src/*.coffee')
    .pipe(coffeelint())
    .pipe(coffeelint.reporter())
    .pipe(coffee(
      bare: true
    ))
    .on('error', gutil.log)
    .pipe(gulp.dest('./lib'))
)

# watches changes in source files
gulp.task('watch', () -> gulp.watch('./src/*', ['default']))
