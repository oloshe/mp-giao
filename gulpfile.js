const gulp = require('gulp')
    , gulpif = require('gulp-if')
    , clean = require('gulp-clean')
    , less = require('gulp-less')
    , mincss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , ts = require('gulp-typescript')
    , uglifyJS = require('gulp-uglify')
    , del = require('del')
    , tsProject = ts.createProject('tsconfig.json')
    , config = require('./tools/gulp.config.js');

const ts_path = 'src/**/*.ts'
const less_path = 'src/**/*.less'
const json_path = 'src/**/*.json'
const wxml_path = 'src/**/*.wxml'

// 清空
gulp.task('clean', () => {
    return gulp.src('dist/', { read: false, allowEmpty: true })
        .pipe(clean())
})

// 编译 ts
gulp.task('ts', () => {
    return gulp.src(ts_path)
        .pipe(tsProject())
        .js.pipe(gulpif(config.minjs, uglifyJS())) // 压缩js
        .pipe(gulp.dest('dist'))
})

// less 转 wxss
gulp.task('less', () => {
    return gulp.src(less_path)
        .pipe(less())
        .pipe(gulpif(config.mincss, mincss())) // 压缩css
        .pipe(rename(path => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest('dist'))
})

// 复制 json
gulp.task('json', () => {
    return gulp.src(json_path)
        .pipe(gulp.dest('dist'))
})

// 复制 wxml
gulp.task('wxml', () => {
    return gulp.src(wxml_path)
        .pipe(gulp.dest('dist'))
})

// 监听
gulp.task('watch', () => {
    // // ts
    // gulp.watch(ts_path, gulp.series('ts'))
    // // less
    // gulp.watch(less_path,{ events: ['change'] }, gulp.series('less'))
    // // json
    // gulp.watch(json_path,{ events: ['change'] }, gulp.series('json'))
    // // less
    // gulp.watch(wxml_path, { events: ['change'] }, gulp.series('wxml'))
    
    // 监听删除事件
    // watch('src/', (e) => {
    //     console.log(e)
    // })
    // gulp.watch('src/', { events: ['unlink'] }).on('change', (path) => {
    //     console.log(path)
    //     del()
    // })
})

// 开发模式
gulp.task('dev', gulp.series(
    'clean',
    gulp.parallel('ts')),
    'watch',
)

// 生产模式
gulp.task('default', gulp.series('dev'))