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

gulp.task('compass',function(){ //压缩js
	return gulp.src(['src/js/*.js','!src/js/*.min.js'])
			.pipe(uglify())
			.pipe(gulp.dest('./src/js'))
})


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



gulp.task('watch',['browserSync','sass'],function(){
	gulp.watch('src/sass/*.scss',['sass']);
	gulp.wathc('src/pages/*.html');
	gulp.watch('src/js/*.js');
})

gulp.task('watchLess',function(){
	gulp.watch('src/less/*.less',['compass'])
})



gulp.task('default',['testLess','compass','sass'],function(){
	console.log('hello world')
})

























