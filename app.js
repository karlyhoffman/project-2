var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var controller = require('./controllers/index');
var users = require('./controllers/user_controller');

var api = require('instagram-node').instagram();
var app = express();

// This is where you would initially send users to authorize
app.get('/authorize_user', authorize_user);
// This is your redirect URI
app.get('/handleauth', handleauth);

api.use({
access_token: '261169793.bdea163.25487dc0790948e9b95e1957f7af0fc2'
});

api.use({
  client_id: 'bdea16361b5641c9a78a572312476041',
  client_secret: 'fe323443fc4149d58e9ac7c73c8a08f5'
});

var redirect_uri = 'http://generalassemb.ly';

function authorize_user(req,res) {
  console.log(res);
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
  console.log('auth')
}

function handleauth(req, res) {
  api.authorize_user('5a24677df68b4ab383bd2337839ad8b1', redirect_uri, function(err, result) {
    if (err) {
      console.log('hiiii');
      console.log(err.body);
      res.send("Didn't work");
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.send('You made it!!');
    }
  });
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', users);
app.use('/index', controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
