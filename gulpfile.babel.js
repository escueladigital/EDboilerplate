import gulp from 'gulp';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';

const server = browserSync.create();

let postcssPlugins = [
  cssnano({
    core: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
];

let sassOptions = {
  outputStyle: 'expanded'
};

gulp.task('styles', () =>
  gulp.src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass(sassOptions))
    .pipe(postcss(postcssPlugins))
    .pipe(plumber.stop())
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream({match: '**/*.css'}))
);

gulp.task('pug', () =>
  gulp.src('./dev/pug/pages/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./public'))
);

gulp.task('scripts', () =>
  gulp.src('./dev/js/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('./public/js'))
);


gulp.task('default', () => {
  server.init({
    server: {
      baseDir: './public'
    },
  });

  gulp.watch('./dev/scss/**/*.scss', ['styles']);
  gulp.watch('./dev/js/**/*.js', ['scripts', server.reload]);
  gulp.watch('./dev/pug/**/*.pug', ['pug', server.reload]);
});
