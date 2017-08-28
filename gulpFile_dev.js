
var gulp = require('gulp'),
  fs = require('fs'),
  less = require('gulp-less'),
  csso = require('gulp-csso'),
  livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  replace = require('gulp-replace'),
  revCollector = require('gulp-rev-collector'),
  connect = require('gulp-connect');
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  notify=require('gulp-notify'),
  plumber=require('gulp-plumber'),
  nodemon=require('gulp-nodemon'),
  express=require('gulp-express'),
  clean = require('gulp-clean'),

  gulp_webpack = require('gulp-webpack'),
  webpack= require('webpack'),
  webpack_config = require('./webpack.config_env.js'),

  devHtml = require('gulp-devHtml');

  var basePath = './';


  //定义监听文件修改任务
  gulp.task('watchBuild',(event) => {
      // livereload.listen();
      gulp.watch([basePath + 'src/index.js'], ['buildjs','minjs']);

  });


  // 生成js文件
  gulp.task('buildjs',() => {
    gulp.src(basePath + 'src/index.js')
      .pipe(gulp_webpack(webpack_config,webpack))
      .pipe(gulp.dest(basePath + 'dist/'))
      // .pipe(devHtml({
      //     files: ['./public/html/demo04.html']
      // }))
      // .pipe(livereload());
  });

  // 生成js文件
  gulp.task('minjs',() => {
    gulp.src(basePath + 'src/date/picker_date.js')
      .pipe(uglify())
      .pipe(gulp.dest(basePath + 'dist/'))
  });

  //定义默认任务
  gulp.task('default',['watchBuild']);

  gulp.task('min',['buildjs','minjs']);

  gulp.run('default');
