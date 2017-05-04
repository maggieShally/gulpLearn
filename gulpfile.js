var gulp   		= require('gulp');
var less   		= require('gulp-less');
var watch  		= require('gulp-watch');
var uglify 		= require('gulp-uglify');//压缩js
var minify 		= require('gulp-minify-css');//压缩css
var sass   		= require('gulp-sass');
var browserSync = require('browser-sync');//自动刷新

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



gulp.task('watch',['browserSync','sass'],function(){
	gulp.watch('src/sass/*.scss',['sass']);
})

gulp.task('watchLess',function(){
	gulp.watch('src/less/*.less',['compass'])
})



gulp.task('default',['testLess','compass','sass'],function(){
	console.log('hello world')
})