const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const path = require('path');
const imagemin = require('gulp-imagemin');

const gutil = require('gulp-util');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const del = require('del');
const sass = require('gulp-sass');

const devConfig = require('./webpack.config.js');
const prodConfig = require('./webpack.prod.config.js');

const browserSync = require('browser-sync');
const spa = require('browser-sync-spa');
const argv = require('yargs').argv;
const replace = require('gulp-replace');
const jsonModify = require('gulp-json-modify');
gulp.task('test', ['karma:single-run']);
gulp.task('test:auto', ['karma:auto-run']);

const browserSyncConf = require('./config/browsersync.config');
const browserSyncDistConf = require('./config/browsersync-dist.config');
const assetsBasePath = (argv.assetsBasePath === undefined) ? './' : argv.assetsBasePath;
const dashboardBaseUrl = (argv.dashboardBaseUrl === undefined) ? 'https://dev-app2.coachlist.com/dashboard' : argv.dashboardBaseUrl;
const baseUrl = (argv.baseUrl === undefined) ? 'https://dev2.coachlist.com' : argv.baseUrl;

const esBaseUrl = (argv.esBaseUrl === undefined) ? 'https://esdev2.coachlist.com:8443/ssps/ssp/_search' : argv.esBaseUrl;
const esUserName = (argv.esUserName === undefined) ? 'clapp' : argv.esUserName;
const esPassword = (argv.esPassword === undefined) ? 'l3WsfD7q28' : argv.esPassword;

const googleApiKey = (argv.googleApiKey === undefined) ? 'AIzaSyCxfm_wmEREVuIa-lZvIZ2gCfcwwrG7yyY' : argv.googleApiKey;

const canRemoveLogs = (argv.canRemoveLogs === undefined) ? false : (argv.canRemoveLogs === 'Y');

process.env.NODE_ENV = 'test';

const karma = require('karma');

gulp.task('karma:single-run', karmaSingleRun);
gulp.task('karma:auto-run', karmaAutoRun);

function karmaFinishHandler(done) {
  return failCount => {
    done(failCount ? new Error(`Failed ${failCount} tests.`) : null);
  };
}

function karmaSingleRun(done) {
  const configFile = path.join(process.cwd(), 'config', 'karma.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

function karmaAutoRun(done) {
  const configFile = path.join(process.cwd(), 'config', 'karma-auto.conf.js');
  const karmaServer = new karma.Server({configFile}, karmaFinishHandler(done));
  karmaServer.start();
}

browserSync.use(spa());

gulp.task('browsersync', browserSyncServe);
gulp.task('browsersync:dist', browserSyncDist);

function browserSyncServe(done) {
  browserSync.init(browserSyncConf());
  done();
}

function browserSyncDist(done) {
  browserSync.init(browserSyncDistConf());
  done();
}

gulp.task('styles', () => {
  gulp.src('public/css/**/*.css')
    .pipe(concat('style.css'))
  // .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('replace-base-url', () => {
  console.log('BaseURL', baseUrl);
  console.log('esBaseUrl', esBaseUrl);
  console.log('dashboardBaseUrl', dashboardBaseUrl);
  gulp.src('src/app/config/config.json')
    .pipe(jsonModify({
      key: 'baseUrl',
      value: baseUrl
    }))
    .pipe(jsonModify({
      key: 'dashboardBaseUrl',
      value: dashboardBaseUrl
    }))
    .pipe(jsonModify({
      key: 'esBaseUrl',
      value: esBaseUrl
    }))
    .pipe(jsonModify({
      key: 'esUserName',
      value: esUserName
    }))
    .pipe(jsonModify({
      key: 'esPassword',
      value: esPassword
    }))
    .pipe(jsonModify({
      key: 'googleApiKey',
      value: googleApiKey
    }))
    .pipe(jsonModify({
      key: 'canRemoveLogs',
      value: canRemoveLogs
    }))
    .pipe(gulp.dest('src/app/config/'));
});

gulp.task('styles-dev', () => {
  gulp.src('public/css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('sass', () => {
  return gulp.src('public/scss/**/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styleSass.css'))
  // .pipe(minify())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass-dev', () => {
  return gulp.src('public/scss/**/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styleSass.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('html', () => {
  return gulp.src('public/**/*.html')
    .pipe(replace('%ASSETS_BASE_PATH%', assetsBasePath))
    .pipe(replace('%DASHBOARD_BASE_URL%', dashboardBaseUrl))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

gulp.task('html-dev', () => {
  return gulp.src('public/**/*.html')
    .pipe(replace('%ASSETS_BASE_PATH%', assetsBasePath))
    .pipe(replace('%DASHBOARD_BASE_URL%', dashboardBaseUrl))
    .pipe(gulp.dest('build'));
});

gulp.task('js', () => {
  gulp.src('public/scripts/**/*.js')
  // .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js-dev', () => {
  gulp.src('public/scripts/**/*.js')
    .pipe(gulp.dest('build/'));
  gulp.src('public/scripts/**/*.css')
    .pipe(gulp.dest('build/'));
});

gulp.task('json', () => {
  gulp.src('public/jsons/**/*.json')
    .pipe(gulp.dest('dist/UIjsons'));
});

gulp.task('json-dev', () => {
  gulp.src('public/jsons/**/*.json')
    .pipe(gulp.dest('build/UIjsons'));
});

gulp.task('images', () => {
  gulp.src('public/images/**/*.+(png|jpg|gif|ico|svg)')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('images-dev', () => {
  gulp.src('public/images/**/*.+(png|jpg|gif|ico|svg)')
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', () => {
  gulp.src('public/fonts/**/*.+(otf|eot|ttf|woff|woff2|)')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('fonts-dev', () => {
  gulp.src('public/fonts/**/*.+(otf|eot|ttf|woff|woff2|)')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('build/fonts'));
});

// Production build
gulp.task('dist', ['replace-base-url', 'html', 'styles', 'sass', 'js', 'images', 'fonts', 'webpack:build']);

// Development Build
gulp.task('build-dev', ['replace-base-url', 'html-dev', 'styles-dev', 'sass-dev', 'js-dev', 'images-dev', 'fonts-dev']);

// Default Task
gulp.task('default', ['dev']);

// Development
gulp.task('dev', ['watch', 'webpack-dev-server']);

// Clean build
gulp.task('clean', done => {
  del(['build'], done);
});

gulp.task('webpack:build', callback => {
  // Run webpack
  webpack(prodConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack:build]', stats.toString({
      colors: true,
      warnings: false
    }));
    callback();
  });
});

gulp.task('watch', ['webpack:build-dev', 'build-dev'], () => {
  gulp.watch(['src/**/*'], ['webpack:build-dev']);
  gulp.watch(['public/css/**/*.css'], ['styles-dev']);
  gulp.watch(['public/scss/**/*.scss'], ['sass-dev']);
  gulp.watch(['public/**/*.html'], ['html-dev']);
  gulp.watch(['public/scripts/**/*.js'], ['js-dev']);
  gulp.watch(['public/scripts/**/*.json'], ['json-dev']);
  gulp.watch(['public/images/**/*.+(png|jpg|gif|ico)'], ['images-dev']);
  gulp.watch(['public/fonts/**/*.+(otf|eot|ttf|woff|woff2|)'], ['fonts-dev']);
});

// Modify some webpack config options
const myDevConfig = Object.create(devConfig);
// MyDevConfig.devtool = 'sourcemap';
// create a single instance of the compiler to allow caching
const devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-dev', callback => {
  // Run webpack
  devCompiler.run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack:build-dev', err);
    }
    gutil.log('[webpack:build-dev]', stats.toString({
      colors: true,
      warnings: false
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', callback => {
  // Modify some webpack config options

  const myConfig = Object.create(devConfig);
  myConfig.devtool = 'eval';
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    disableHostCheck: true,
    hot: true,
    contentBase: path.join(__dirname, 'build'),
    publicPath: './public',
    filename: 'index.js',
    stats: {
      colors: true
    },
    historyApiFallback: true
  }).listen(8080, '0.0.0.0', err => {
    if (err) {
      throw new gutil.PluginError('webpack-dev-server', err);
    }
    gutil.log('[webpack-dev-server]', 'https://coachlist-master-kchan1288.c9users.io:8081/');
  });
});