var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// back/app.js
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});


var pongModule = require("./public/javascripts/Pong/Pong.js");
var charModule = require("./public/javascripts/Charade/Charade.js");

pongModule.initPong(io);
charModule.initChar(io);

var cnt = 0;

io.on("connection", (socket) => {
  cnt++;
  console.log(cnt);

  console.log(socket.id);
  if (cnt < 3) {
    socket.join(socket.id);
  } else {
    socket.join("2");
  }


  socket.on("send message", () => {//send message 이벤트 발생
    console.log("도착");
    io.to("1").emit("receive message", socket.id);
    //클라이언트에 이벤트를 보냄
  });

  socket.on("keyDown", (item) => {
    console.log("Down",item);
  });

  socket.on("keyUp", (item) => {
    console.log("Up",item);
  });
  
  socket.on("disconnect", (reason) => {
    cnt--;
  });
});

httpServer.listen(80);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
