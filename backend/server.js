const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTTPS 활성화 부분
const fs = require("fs");

const options = {
  ca: fs.readFileSync("/etc/letsencrypt/live/j5a104.p.ssafy.io/fullchain.pem"),
  key: fs.readFileSync("/etc/letsencrypt/live/j5a104.p.ssafy.io/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/j5a104.p.ssafy.io/cert.pem"),
};

// app.use("/", function(req, res, next){
//   console.log("start")
//   next();
// })

const user = require("./src/Routes/User");
const game = require("./src/Routes/Game");
app.use("/user", user);
app.use("/game", game);

// back/app.js
const httpServer = require("http").createServer();
const https = require("https").createServer(options, app);

// /client/build 폴더를 static 파일로 사용할 수 있도록 함
app.use(express.static(path.join(__dirname, "../frontend/build")));

//요청
app.get("/", (req, res) => {
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});



app.get("/callback/kakao", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

const io = require("socket.io")(https, {
  cors: {
    origin: "https://j5a104.p.ssafy.io",
    methods: ["GET", "POST"],
  },
});




const airDrawingModule = require("./src/Websocket/AirDrawing/AirDrawing");
const airDrawingStateModule = require("./src/Websocket/AirDrawing/AirDrawingState"); // 같은 디렉토리에 있다고 가정
const requestPongModule = require("./src/Websocket/AirDrawing/AirDrawingRequest"); // 같은 디렉토리에 있다고 가정

airDrawingModule.airDrawing(io, airDrawingStateModule);
requestPongModule.airDrawingRequest(app, airDrawingStateModule);

app.get("/*", (req, res) => {
  console.log(__dirname);
  // index.html 파일 응답
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

httpServer.listen(80);
https.listen(443);

module.exports = app;
