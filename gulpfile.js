'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var db = require('./models/db');
var knex = require('knex');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task('db_create_user_table', function() {
    var sqlString = "CREATE TABLE user_accounts (" +
        "id INT NOT NULL AUTO_INCREMENT," +
        "username VARCHAR(20) NOT NULL UNIQUE," +
        "email VARCHAR(255) NOT NULL UNIQUE, " +
        "password_hash VARCHAR(61) NOT NULL, " +
        "PRIMARY KEY (id) " +
        ");";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});

gulp.task('db_drop_user_table', function() {
    var sqlString = "drop table user_accounts;";
    //callback(response)
    function cb(res) {
        console.log(res);
    }
    db.raw(sqlString).then(cb);
    //db.raw(query).then(callback)
});

gulp.task('Nodemon', restartServer);

function restartServer() {
    nodemon({
        script: './bin/www',
        ext: 'js hbs scss sql'
    });
}

gulp.task('compile-sass', function(){
    gulp.src('./public/styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('sass-watch', function(){
    gulp.watch(['./public/styles/*.scss'], ['compile-sass'])
});

gulp.task('default', ['Nodemon','sass-watch']);
