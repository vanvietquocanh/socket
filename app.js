var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var cors = require('cors')
var mongoose =  require('/usr/lib/node_modules/mongoose');
var pathdb = require('../database/mongodb.tempmail');
var schedule = require('node-schedule');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var wifiRouter = require('./routes/wifi');
var donateRouter = require('./routes/donate');
var toolRouter = require('./routes/tool');

mongoose.connect(pathdb, {useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex: true});

//mongodb Connect
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>console.log("CONNECTED SUCCESS"));

var clearMail = schedule.scheduleJob({hour : 0}, async function(){
  
})

var app = express();
app.io = require('socket.io')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors())
// app.use(logger('dev'));
app.use(express.json({limit: '2mb'}));
app.use(express.urlencoded({ extended: true, limit: '2mb'}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.io.sockets.on('connection', function (socket) {
  console.log("hello");
});
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/donate', donateRouter);
app.use('/tool', toolRouter);

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

module.exports = app;
