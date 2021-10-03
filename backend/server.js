const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

// back/app.js
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const pongModule = require("./public/AirDrawing/AirDrawing");
// const charModule = require("./public/javascripts/Charade/Charade.js");
const pongStateModule = require("./public/AirDrawing/AirDrawingState"); // 같은 디렉토리에 있다고 가정
const requestPongModule = require("./public/AirDrawing/AirDrawingRequest"); // 같은 디렉토리에 있다고 가정

pongModule.airDrawing(io, pongStateModule);
// charModule.initChar(io,pongStateModule);

requestPongModule.airDrawingRequest(app, pongStateModule);

httpServer.listen(80);

module.exports = app;
