// gulp.js configuration
var
  // modules
  gulp = require('gulp'),

  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),

  htmlclean = require('gulp-htmlclean'),

  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),

  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'src/',
    build: 'build/'
  }
;

// image processing
gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// HTML processing
gulp.task('html', ['images'], function() {
  var
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {

  var jsbuild = gulp.src([folder.src + 'assets/js/**/*'])
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build + 'assets/js/'));
});

gulp.task( 'font', ['images'], function() {
    return gulp.src(
        [ folder.src + 'assets/fonts/**' ],
        { base: folder.src }
    )
    .pipe( gulp.dest(folder.build) );
} );

// CSS processing
gulp.task('css', ['images', 'font'], function() {

  var postCssOpts = [
  assets({ loadPaths: ['images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'assets/scss/origin/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'assets/css/'));

});

gulp.task( 'min_css', ['css'], function() {
    return gulp.src(folder.src + 'assets/scss/*.min.css')
    .pipe( gulp.dest(folder.build + 'assets/css') );
} );

gulp.task( 'css_image', ['css'], function() {
    return gulp.src(folder.src + 'assets/scss/origin/images/**')
    .pipe( gulp.dest(folder.build + 'assets/css/images') );
} );

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'assets/images/**/*', ['images']);

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // javascript changes
  gulp.watch(folder.src + 'assets/js/**/*', ['js']);

  // css changes
  gulp.watch(folder.src + 'assets/scss/**/*', ['css', 'min_css']);
  gulp.watch(folder.src + 'assets/scss/images/**/*', ['css_image']);

  // font changes
  gulp.watch(folder.src + 'assets/fonts/**/*', ['font']);
});

gulp.task('default', ['run', 'watch']);

gulp.task('run', ['html', 'css', 'min_css', 'css_image', 'js', 'font']);