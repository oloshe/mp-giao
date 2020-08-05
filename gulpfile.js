const gulp = require('gulp')
    , clean = require('gulp-clean')
    , less = require('gulp-less')
    , mincss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , ts = require('gulp-typescript')
    , uglifyJS = require('gulp-uglify')
    , tsProject = ts.createProject('tsconfig.json');

const ts_path = 'src/**/*.ts'
const less_path = 'src/**/*.less'
const json_path = 'src/**/*.json'
const wxml_path = 'src/**/*.wxml'

// 清空
gulp.task('clean', () => {
    return gulp.src('dist', { read: false, allowEmpty: true })
        .pipe(clean())
})

// 编译 ts
gulp.task('ts', () => {
    return gulp.src(ts_path)
        .pipe(tsProject())
        .js.pipe(uglifyJS()) // 压缩js
        .pipe(gulp.dest('dist'))
})

// less 转 wxss
gulp.task('less', () => {
    return gulp.src(less_path)
        .pipe(less())
        .pipe(mincss()) // 压缩css
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

// 监听json
// gulp.task('watch-json', gulp.watch())

// 开发模式
gulp.task('dev', gulp.series('clean', gulp.parallel('ts', 'less', 'json', 'wxml')))

// 生产模式
gulp.task('default', gulp.series('dev'))