const gulp = require('gulp')
    , gulpif = require('gulp-if')
    , changed = require('gulp-changed')
    , newer = require('gulp-newer')
    , clean = require('gulp-clean')
    , less = require('gulp-less')
    , sass = require('gulp-sass')
    , mincss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , ts = require('gulp-typescript')
    , imagemin = require('gulp-imagemin')
    , uglifyJS = require('gulp-uglify')
    // , del = require('del')
    , tsProject = ts.createProject('tsconfig.json')
    , config = {
        // 是否压缩css
        mincss: true,
        // 是否压缩js
        minjs: false,
    }

    // path
    , ts_path = 'src/**/*.ts'
    , less_path = 'src/**/*.less'
    , sass_path = 'src/**/*(.scss|.sass)'
    , json_path = 'src/**/*.json'
    , wxml_path = 'src/**/*.wxml'
    , img_path = 'src/**/*.{png,jpg,gif}'
    , dist = 'dist'

// 清空
gulp.task('clean', () => {
    return gulp.src('dist/', { read: false, allowEmpty: true })
        .pipe(clean())
})

// 编译 ts
gulp.task('ts', () => {
    return gulp.src(ts_path)
        .pipe(changed(dist, { extension: '.js' }))
        .pipe(newer(dist))
        .pipe(tsProject())
        .js.pipe(gulpif(config.minjs, uglifyJS())) // 压缩js
        .pipe(gulp.dest(dist))
})

// less 转 wxss
gulp.task('less', () => {
    return gulp.src(less_path)
        .pipe(changed(dist, { extension: '.wxss' }))
        .pipe(less())
        .pipe(gulpif(config.mincss, mincss())) // 压缩css
        .pipe(rename(path => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(dist))
})

//  Sass 转 wxss
gulp.task('sass', () => {
    return gulp.src(sass_path)
        .pipe(changed(dist, { extension: '.wxss' }))
        .pipe(sass())
        .pipe(gulpif(config.mincss, mincss())) // 压缩css
        .pipe(rename(path => {
            path.extname = '.wxss'
        }))
        .pipe(gulp.dest(dist))
})

// 复制 json
gulp.task('json', () => {
    return gulp.src(json_path)
        .pipe(changed(dist))
        .pipe(gulp.dest(dist))
})

// 复制 wxml
gulp.task('wxml', () => {
    return gulp.src(wxml_path)
        .pipe(changed(dist))
        .pipe(gulp.dest(dist))
})

// 图片压缩(只改动有变动的文件）
gulp.task('img', () => {
    return gulp
        .src(img_path)
        .pipe(changed(dist))
        .pipe(
            imagemin({
                progressive: true,
            })
        )
        .pipe(gulp.dest(dist))
})

gulp.task('trans', gulp.parallel('ts', 'less', 'sass', 'json', 'wxml', 'img'))

// 开发模式
gulp.task('dev', gulp.series('trans'))

// 生产模式
gulp.task('default', gulp.series('clean', 'trans'))


// 监听
gulp.task('start-watch', () => {
    gulp.watch('src/', {
        ignoreInitial: false,
    }, gulp.series('dev'))
})
gulp.task('watch', gulp.series('clean', 'start-watch'))
