var gulp   		= require('gulp');
var less   		= require('gulp-less');
var watch  		= require('gulp-watch');
var uglify 		= require('gulp-uglify');//压缩js
var minify 		= require('gulp-minify-css');//压缩css
var sass   		= require('gulp-sass');
var browserSync = require('browser-sync');//自动刷新
var useref		= require('gulp-useref');//将多个文件拼接成一个文件
var gulpIf 		= require('gulp-if');//
var imagemin	= require('gulp-imagemin');//图片压缩
var cache		= require('gulp-cache');//减少图片重复压缩
var del			= require('del');//清理生成文件
var runSequence	= require('run-sequence');//按照顺序执行
var spritesmith = require('gulp.spritesmith');//生成雪碧图
var browserify  = require('browserify');// 构建模版化应用，是一个编译工具
var babelify	= require('babelify');//babel配合browserify需安装babelify
var source		= require('vinyl-source-stream');//vinyl-source-stream用于将Browserify的bundle()的输出转换为Gulp可用的[vinyl][]（一种虚拟文件格式）流
var babel   	= require('gulp-babel');

// var webpack 	= require('webpack');


gulp.task('testLess',function(){
	gulp.src(['src/less/*.less'])
		.pipe(less())
		.pipe(gulp.dest('./src/css'))
		.pipe(minify())
		.pipe(gulp.dest('./src/css'))
})

gulp.task('sass',function(){
	gulp.src('src/sass/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('./src/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
})

// gulp.task('compass',function(){ //压缩js
// 	return gulp.src(['src/js/*.js','!src/js/*.min.js'])
// 			.pipe(uglify())
// 			.pipe(gulp.dest('./src/js'))
// })


gulp.task('browserSync',function(){
	browserSync({
	    server: './src',
	    port: 8888
  	})
})


gulp.task('useref',function(){
	return gulp.src('src/pages/*.html')
			.pipe(gulpIf('*.css',minify()))
			.pipe(gulpIf('*.js',uglify()))
			.pipe(useref())
			.pipe(gulp.dest('dist/js/'));
})

gulp.task('images',function(){
	return gulp.src('src/images/*.+(png|jpg|gif)')
			.pipe(cache(imagemin({
				interlaced: true
			})))
			.pipe(gulp.dest('dist/images'))
})

gulp.task('clean',function(callback){
	del('dist');
	return cache.clearAll(callback);
})

gulp.task('clean:dist',function(callback){
	del([
		'dist/**/*','!dist/images','!dist/images/**/*'],callback)
})

// gulp.task('es6',function(){
// 		 	gulp.src('src/**/*.js')
// 			.pipe(babel({compact: false}))
// 			.pipe(gulp.dest('src/js/es6'))

// })


gulp.task('script:build',function(){
	return browserify('src/js/index.js')
		.transform(babelify,{
			presets: ["es2015", "react"]
		})
		.bundle()
		.pipe(source('bundle2.js'))
<<<<<<< HEAD
		.pipe(gulp.dest('src/js/js'))
=======
		.pipe(gulp.dest('src/js/build'))
>>>>>>> fa15f06e5b925eb9c07552e257ec44d08292b9bc
})


gulp.task('watch',['browserSync','sass','script:build'],function(){
	gulp.watch('src/sass/*.scss',['sass']);
	gulp.watch('src/pages/*.html');
	gulp.watch('src/**/*.js',['script:build']);
	gulp.watch('src/less/*.less',['testLess'])
})


gulp.task('sprite',function(){
	var spriteData = gulp.src('src/img/*.png')
		.pipe(spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.scss',
			cssFormat: 'scss'
		}));
	return spriteData.pipe(gulp.dest('src/css/sprite/'));

})




gulp.task('build',function(callback){
	runSequence('clean:dist',
		['sass','useref','images'],
		callback
		)
	console.log('****************building files****************');
})


//gulp --product
//
// gulp.task('webpack',function(){
// 	isProduct  = argv.product;
// 	isWatch = !isProduct;
// 	console.log('正在处理：'+( isProduct ? '线上' : '本地') + '环境');
// 	fse.emptydirSync();
// 	gulp.start('webpack')
// })


gulp.task('default',function(callback){
	runSequence(['sass','browserSync','watch','sprite','script:build'],callback)
})























