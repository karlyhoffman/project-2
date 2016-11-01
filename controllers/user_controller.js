var express = require('express');
var userCtrl = express.Router();
var UserModel = require('../models/UserModel');
var PhotoModel = require('../models/PhotoModel');
var bcrypt = require('bcryptjs');
var session = require('express-session');

userCtrl.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


userCtrl.get('/yo', function (req, res, next){
  UserModel.where({id:2}).fetch({withRelated:['photos']})
      .then(function(user){
          res.json(user.related('photos'))
      })
});

/* GET users listing. */
userCtrl.get('/register', renderRegister);
userCtrl.get('/login', renderLogin);
userCtrl.get('/home', function(req,res,next){
    // PhotoModel.where('user_id', req.session.userId).fetch().then(function(result){
    //     var photo = result.attributes.image_as_base64;
    //     console.log(photo);
    //     console.log('image as base!!');
        res.render('userHome',{
            username: req.session.username,
            message: req.session.message
            // photo: photo
        });
    // });
    req.session.userRegisteredMessage = '';
});

userCtrl.get('/photoAPI', function(req,res,next){
    PhotoModel.collection().fetch().then(function(result){
        res.json(result)
    })
});

userCtrl.get('/', function(req, res, next) {
    res.send('respond with a resource');
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
            }).save().then(function(user) {
                console.log(user.attributes.id);
                req.session.userId = user.attributes.id;
                req.session.username = req.body.username;
                req.session.message = 'thanks for joining cameraless concerts, ';
                req.session.save();
                console.log(req.session.username);
                res.redirect('/photo/upload');
            });
        }

        // if already registered use email or username to retrieve password and login ?
        else if (result.attributes.email === req.body.email || result.attributes.username == req.body.username){
            req.session.userRegisteredMessage = 'you already have an account! please log in!';
            req.session.passwordMessage = '';
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
                    req.session.userId = result.attributes.id;
                    req.session.username = result.attributes.username;
                    req.session.message = 'welcome back to cameraless concerts, ';
                    req.session.userRegisteredMessage = '';
                    req.session.save();
                    res.redirect('/home');
                }
                else {
                    req.session.userRegisteredMessage = '';
                    req.session.passwordMessage = 'incorrect password, please try again!';
                    req.session.save();
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
        userRegisteredMessage: req.session.userRegisteredMessage,
        incorrectPassword: req.session.passwordMessage
    });
}


module.exports = userCtrl;
