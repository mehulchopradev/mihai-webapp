var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const ehbs = require('express-handlebars');
const ws = require('ws');

const userService = require('./services/user-service');

const wss = new ws.Server({
  port: 3002
});

wss.on('connection', (wsc) => {
  console.log(`Client connected to web socket from ${wsc}`);
});

exports.wss = wss;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', ehbs());
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'ABC123',
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  console.log('Serialize');
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser(async function(username, done) {
  console.log('deserialize');
  try {
    const user = await userService.getUserByUsername(username);
    done(null, user);
  } catch(err) {
    done(null, null);
  }
});

require('./authentication/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
