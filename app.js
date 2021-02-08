'use stric';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var welcomeRouter = require('./routes/welcome');
var cancionesRouter = require('./routes/canciones');

var InitiateMongoServer = require('./config/database');
var bodyParser = require('body-parser');

var MethodOverride = require('method-override');
var session = require('express-session');
const flash  = require('connect-flash');
const passport = require('passport');


var fs = require('fs');
var https = require('https');

var options = {
  key: fs.readFileSync(__dirname + '/crt/nodejs.test/server.key'),
  cert: fs.readFileSync(__dirname + '/crt/nodejs.test/server.crt')
};


var app = express();

//Inicializa base de datos
InitiateMongoServer();
app.use(bodyParser.json()); //convierte el dato a formato JSON
require('./config/database');
require('./config/passport');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(MethodOverride('_method'));
app.use(session({
    secret: 'appsecreta',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});

//routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/welcome', welcomeRouter);
app.use('/canciones', cancionesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



https.createServer(options, app).listen(8000);


module.exports = app;




