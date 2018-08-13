import gulp from 'gulp'
import plumber from 'gulp-plumber'
import pug from 'gulp-pug'
import browserSync from 'browser-sync'
import sass from 'gulp-sass'
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import watch from 'gulp-watch'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import buffer from 'vinyl-buffer'
import minify from 'gulp-minify'

const server = browserSync.create();

const production = true
const env = production ? 'prod' : 'dev'
const srcJs = production ? '.js' : '-min.js'
const minJs = production ? '-min.js' : '.js'

const postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
];

gulp.task('serve', function() {
  server.init({
    server: {
      baseDir: './public'
    }
  });

  watch('./themes/custom/escueladigital/scss/**/*.scss', () => gulp.start('styles'));
  watch('./themes/custom/escueladigital/babel/**/*.js', () => gulp.start('scripts',server.reload) );
});

const sassOptions = env == 'dev' ? {
  includePaths: ['node_modules'],
  sourceComments: true,
  outputStyle: 'expanded'
} : {
  includePaths: ['node_modules'],
}

gulp.task('styles', () => {
  return env == 'dev' 
    ? gulp.src('./dev/scss/styles.scss')
      .pipe(plumber())
      .pipe(sass(sassOptions))
      .pipe(gulp.dest('./public/css/'))
      .pipe(server.stream({match: '**/*.css'}))
    : gulp.src('./dev/scss/styles.scss')
      .pipe(plumber())
      .pipe(sass(sassOptions))
      .pipe(postcss(postcssPlugins))
      .pipe(gulp.dest('./public/css/'))
      .pipe(server.stream({match: '**/*.css'}))
});

gulp.task('scripts', () =>
  browserify('./dev/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function(err){
      console.error(err);
      this.emit('end')
    })
    .pipe(source('ed.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: srcJs,
        min: minJs
      }
    }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
);

gulp.task('default', ['serve', 'styles', 'scripts']);
