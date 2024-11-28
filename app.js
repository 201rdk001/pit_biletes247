var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var hbs = require('express-hbs');
var Database = require('./database');

var indexRouter = require('./routes/index');
var profileRouter = require('./routes/profile');
var adminRouter = require('./routes/admin');
var eventsRouter = require('./routes/events');

var app = express();

// view engine setup
app.engine('hbs', hbs.express4({
  defaultLayout: "views/layout.hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.db = Database.open();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "dev", saveUninitialized: false, resave: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (typeof err == 'number') {
    err = { status: err };
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.status == 403) {
    res.locals.message ??= "Neautorizēta piekļuve"
  }

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
