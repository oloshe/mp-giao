const gulp = require('gulp')
    , gulpif = require('gulp-if')
    , changed = require('gulp-changed')
    , clean = require('gulp-clean')
    , less = require('gulp-less')
    , mincss = require('gulp-minify-css')
    , rename = require('gulp-rename')
    , ts = require('gulp-typescript')
    , imagemin = require('gulp-imagemin')
    , uglifyJS = require('gulp-uglify')
    , del = require('del')
    , tsProject = ts.createProject('tsconfig.json')
    , config = require('./tools/gulp.config.js');

const ts_path = 'src/**/*.ts'
const less_path = 'src/**/*.less'
const json_path = 'src/**/*.json'
const wxml_path = 'src/**/*.wxml'
const img_path = 'src/**/*.{png,jpg,gif}'
const dist = 'dist'

// 清空
gulp.task('clean', () => {
    return gulp.src('dist/', { read: false, allowEmpty: true })
        .pipe(clean())
})

// 编译 ts
gulp.task('ts', () => {
    return gulp.src(ts_path)
        .pipe(changed(dist, { extension: '.js' }))
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

//图片压缩(只改动有变动的文件）
gulp.task("img", () => {
	return gulp
		.src(img_path)
		.pipe(changed(dist))
		.pipe(
			imagemin({
				progressive: true,
			})
		)
		.pipe(gulp.dest(dist));
});


// 开发模式
gulp.task('dev', gulp.series(
    gulp.parallel('ts', 'less', 'json', 'wxml', 'img')),
    'watch',
)

// 生产模式
gulp.task('default', gulp.series('dev'))


// 监听
gulp.task('watch', () => {
    // TODO 分类重新构建
    // // ts
    // gulp.watch(ts_path, gulp.series('ts'))
    // // less
    // gulp.watch(less_path,{ events: ['change'] }, gulp.series('less'))
    // // json
    // gulp.watch(json_path,{ events: ['change'] }, gulp.series('json'))
    // // less
    // gulp.watch(wxml_path, { events: ['change'] }, gulp.series('wxml'))
    
    gulp.watch('src/', {
        ignoreInitial: false,
        events: ["change", "unlink"]
    }, gulp.series('dev'))
})
