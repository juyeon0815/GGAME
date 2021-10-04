const express = require('express');
const path = require("path");
const app = express();

const cors = require("cors");
app.use(cors());


// back/app.js
const httpServer = require("http").createServer();
const https = require("https");
//HTTPS 활성화 부분 
const fs =require('fs');

const options ={
  ca: fs.readFileSync('/etc/letsencrypt/live/j5a104.p.ssafy.io/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/j5a104.p.ssafy.io/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/j5a104.p.ssafy.io/cert.pem')
};

// /client/build 폴더를 static 파일로 사용할 수 있도록 함
app.use(express.static(path.join(__dirname, "../frontend/build")));

// / 요청
app.get("/", (req, res) => {
  console.log(__dirname);
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// app.get('/*', function(req, res) {
//   res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
// })
 

const io = require("socket.io")(https, {
  cors: {
    origin: "https://j5a104.p.ssafy.io",
    methods: ["GET", "POST"],
  },
});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

const pongModule = require("./public/AirDrawing/AirDrawing");
// const charModule = require("./public/javascripts/Charade/Charade.js");
const pongStateModule = require("./public/AirDrawing/AirDrawingState"); // 같은 디렉토리에 있다고 가정
const requestPongModule = require("./public/AirDrawing/AirDrawingRequest"); // 같은 디렉토리에 있다고 가정

const user = require('./src/Routes/user')
const game = require('./src/Routes/Game')
const achievement = require('./src/Routes/Achievement')

app.use('/user',user)
app.use('/game',game)
app.use('/achievement',achievement)

pongModule.airDrawing(io,pongStateModule);
// charModule.initChar(io,pongStateModule);

requestPongModule.airDrawingRequest(app, pongStateModule);


app.listen(443, function(){
  console.log("server port :"+"443")
})

httpServer.listen(80);
https.createServer(options,app).listen(443);

module.exports = app;
