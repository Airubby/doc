//1.全局安装：npm install -g gulp
//2.本地安装：npm install --save-dev gulp   //-dev是开发的时候依赖用到
//3.项目根目录新疆这个gulpfile.js文件，名称不要为gulp.js
//根目录cmd运行：gulp css    css为task的名字 默认为default，可以直接gulp运行
//base: './'是基于dest('dist')的dist目录然后下面仍然是css/*.css  目录层级 

"use strict"
const gulp = require('gulp');
// 自动加前缀的一个NODE包
const autoprefixer = require('gulp-autoprefixer');
// 合并JS用的
const concat = require('gulp-concat');

//压缩CSS
const cleanCss = require('gulp-clean-css');
//压缩IMG
const imagemin = require('gulp-imagemin');
//压缩JS
const jsmin = require('gulp-jsmin');
const rename = require('gulp-rename');
//压缩HTML
const htmlmin = require('gulp-htmlmin');
//改名字，利用文件内容生成的hash名
const rev = require('gulp-rev');
// 替换引用路径
const revCollector = require('gulp-rev-collector');

//压缩CSS
gulp.task('css', () => {
    return gulp.src('./css/*.css', { base: './' })
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist'));
});
//压缩IMG
gulp.task('images', () => {
    return gulp.src('./images/*', { base: './' })
        .pipe(imagemin())
        .pipe(gulp.dest('dist'));
});
//压缩JS
gulp.task('js', () => {
    return gulp.src('./js/*.js', { base: './' })
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});
//压缩HTML
gulp.task('html', () => {
    return gulp.src('./*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest('dist'));
});
//改名字，利用文件内容生成的hash名
gulp.task('name', ['css', 'images', 'js', 'html'], () => { //执行name任务要先执行css, images, js, html任务
    return gulp.src(['./dist/**/*', '!**/*.html'], { base: './dist' })
        .pipe(rev())
        .pipe(gulp.dest('build'))
        .pipe(rev.manifest()) //收集原文件名与新文件名的关系
        .pipe(gulp.dest('build')); //以json形式存入build目录下
});
// 替换引用路径
gulp.task('revCollector', ['name'], () => { //执行revCollector任务要先执行name任务
    // 根据生成的json文件，去替换html里的路径
    return gulp.src(['./build/*.json', './dist/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('build'));
});
//默认入口
gulp.task('default', ['revCollector']);