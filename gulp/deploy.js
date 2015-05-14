var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');

module.exports = function(options){

  gulp.task('deploy', ['build'], function(){
    gulp.src(options.dist + "/**/*")
      .pipe(ghPages());
  });


}
