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
import imagemin from 'gulp-imagemin'
import sitemap from 'gulp-sitemap'
import cachebust from 'gulp-cache-bust'

const server = browserSync.create()

const postcssPlugins = [
  cssnano({
    core: true,
    zindex: false,
    autoprefixer: {
      add: true,
      browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
    }
  })
]

gulp.task('styles-dev', () => {
  gulp.src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['node_modules'],
      sourceComments: true,
      outputStyle: 'expanded'
    }))
    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream({match: '**/*.css'}))
})

gulp.task('styles-build', () => {
  gulp.src('./dev/scss/styles.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(postcss(
      [
        cssnano({
          core: true,
          zindex: false,
          autoprefixer: {
            add: true,
            browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
          }
        })
      ]
    ))
    .pipe(gulp.dest('./public/css/'))
    .pipe(server.stream({match: '**/*.css'}))
})

gulp.task('pug-dev', () =>
  gulp.src('./dev/pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: true,
      basedir: './dev/pug'
    }))
    .pipe(gulp.dest('./public'))
)

gulp.task('pug-build', () =>
  gulp.src('./dev/pug/pages/**/*.pug')
    .pipe(plumber())
    .pipe(pug({
      pretty: false,
      basedir: './dev/pug'
    }))
    .pipe(gulp.dest('./public'))
)

gulp.task('scripts-dev', () =>
  browserify('./dev/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '-min.js',
        min: '.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
)

gulp.task('scripts-build', () =>
  browserify('./dev/js/index.js')
    .transform(babelify, {
      global: true // permite importar desde afuera (como node_modules)
    })
    .bundle()
    .on('error', function (err) {
      console.error(err)
      this.emit('end')
    })
    .pipe(source('scripts.js'))
    .pipe(buffer())
    .pipe(minify({
      ext: {
        src: '.js',
        min: '-min.js'
      }
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./public/js'))
)

gulp.task('images', () => {
  gulp.src('./dev/img/**/**')
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('./public/assets/img'))
})

gulp.task('sitemap', () => {
  gulp.src('./public/**/*.html', {
    read: false
  })
    .pipe(sitemap({
      siteUrl: 'https://example.com' // remplazar por tu dominio
    }))
    .pipe(gulp.dest('./public'))
})

gulp.task('dev', ['styles-dev', 'pug-dev', 'scripts-dev'], () => {
  server.init({
    server: {
      baseDir: './public'
    }
  })

  watch('./dev/scss/**/**', () => gulp.start('styles-dev'))
  watch('./dev/js/**/**', () => gulp.start('scripts-dev', server.reload))
  watch('./dev/pug/**/**', () => gulp.start('pug-dev', server.reload))
  watch('./dev/img/**/**', () => gulp.start('images-dev'))
})

gulp.task('cache', () => {
  gulp.src('./public/**/*.html')
    .pipe(cachebust({
      type: 'timestamp'
    }))
    .pipe(gulp.dest('./public'))
})


gulp.task('build', ['styles-build', 'pug-build', 'scripts-build', 'images', 'cache', 'sitemap'])
