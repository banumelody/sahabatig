var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') 
    notify = require("gulp-notify") 
    browserSync = require('browser-sync').create();
    reload = browserSync.reload;

var config = {
    sourceDir: './resources',
     bowerDir: './bower_components' 
}

// Copy Fonts
gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

// Copy Image
gulp.task('img', function() { 
    return gulp.src(config.sourceDir + '/img/**.*') 
        .pipe(gulp.dest('./public/img')); 
});

// Copy JS
gulp.task('js',function(){
  return gulp.src([
      config.bowerDir + '/jquery/dist/jquery.min.js',
      config.bowerDir + '/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
      config.sourceDir + '/js/*.js'
  ]) 
  .pipe(gulp.dest('./public/js/'));
});

// Copy HTML
gulp.task('html', function() { 
    return gulp.src(config.sourceDir + '/views/**.html') 
        .pipe(gulp.dest('./public/')); 
});


// Compile SCSS to CSS
gulp.task('css', function() { 
    return gulp.src(config.sourceDir + '/sass/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
        .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
         }))) 
         .pipe(gulp.dest('./public/css')); 
});

// Live Reload Browser
gulp.task('serve', function () {

    // Serve files
    browserSync.init({
        notify: false,
        server: {
            baseDir: "./public"
        }
    });

    // Watch changes
    gulp.watch(config.sourceDir + '/sass/**/*.scss', ['css', reload]); 
    gulp.watch(config.sourceDir + '/js/*.js', ['js', reload]); 
    gulp.watch(config.sourceDir + '/views/**.html', ['html', reload]); 
});


// Default Task
  gulp.task('default', ['icons', 'css', 'js', 'html', 'serve']);
