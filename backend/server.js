// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const io = require('socket.io')(server,{
//     cors : {
//         origin :"*",
//         credentials :true
//         // origin: "http://localhost:3000",
//         // methods: ["GET", "POST"],
//     }
// });

// const cors = require('cors')
// app.use(cors());

// const Pong = require('./public/Pong/Pong')
// // app.use('/pong',Pong)
// Pong.pong(io,app)


// const port = 5000;
// server.listen(port, ()=>console.log(`Listening on port ${port}`));

const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());

// back/app.js
const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const pongModule = require('./public/Pong/Pong');
// const charModule = require("./public/javascripts/Charade/Charade.js");
const pongStateModule = require('./public/Pong/PongState'); // 같은 디렉토리에 있다고 가정
const requestPongModule = require('./public/Pong/PongRequest'); // 같은 디렉토리에 있다고 가정

pongModule.pong(io,pongStateModule);
// charModule.initChar(io,pongStateModule);

requestPongModule.request_pong(app,pongStateModule);

httpServer.listen(80);

module.exports = app;
