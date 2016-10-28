var express = require('express');
var userCtrl = express.Router();
var UserModel = require('../models/UserModel');
var bcrypt = require('bcryptjs');
var session = require('express-session');

userCtrl.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

/* GET users listing. */
userCtrl.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

userCtrl.get('/register', renderRegister);
userCtrl.get('/login', renderLogin);
userCtrl.get('/home', function(req,res,next){
    res.render('userHome',{
        username: req.session.username + '!',
        message: req.session.message
    });
    req.session.userRegisteredMessage = '';
    console.log(req.session)
});

userCtrl.post('/register', attemptToRegister);
userCtrl.post('/login', attemptToLogin);

function attemptToRegister(req, res, next) {
    UserModel.where('email', req.body.email).fetch().then(function(result){
        if (result === null){
            console.log(req.body.email);
            var password = req.body.password;
            console.log(password);
            var hashedPassword = createPasswordHash(password);
            var account = new UserModel({
                email: req.body.email,
                username: req.body.username,
                password_hash: hashedPassword
            }).save().then(function() {
                req.session.username = req.body.username;
                req.session.message = 'thanks for joining cameraless concerts, ';
                req.session.save();
                console.log(req.session.username);
                res.redirect('/home');
            });
        }

        // if already registered use email or username to retrieve password and login ?
        else if (result.attributes.email === req.body.email || result.attributes.username == req.body.username){
            req.session.userRegisteredMessage = 'you already have an account! please ';
            res.redirect('/login');
        }
        }).catch(function(err){
        console.log(err)
    })
}

function createPasswordHash (password) {
    var salt = 10; // salt factor of 10
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

function comparePasswordHashes (input, db) {
    //input: user's attempted to login
    var hash = createPasswordHash(input);
    return bcrypt.compareSync(input, db);
}

function attemptToLogin(req, res, next) {
    var password = req.body.password;
    UserModel.query(function(qb){
        qb.where('email', req.body.user).orWhere('username', req.body.user)})
        .fetch().then(function(result) {
            if(result === null){
                res.redirect('/register');
            }
            else {
                var attempt = comparePasswordHashes(req.body.password, result.attributes.password_hash);
                console.log('req body password');
                console.log(req.body.password);
                console.log('result password');
                console.log(result.attributes.password_hash);
                if(attempt === true){
                    res.redirect('/home');
                    req.session.username = result.attributes.username;
                    req.session.message = 'welcome back to cameraless concerts, ';
                    req.session.save();
                }
                else {
                    res.redirect('/login')
                }
            }
            // res.json({'is_logged_in': attempt });
        }).catch(function(err){
            console.log(err)
    })
}

function renderRegister(req,res,next){
    res.render('register',{})
}
function renderLogin(req,res,next){
    res.render('login',{
        userRegisteredMessage: req.session.userRegisteredMessage
    });
}


module.exports = userCtrl;
