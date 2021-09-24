const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
        // origin: "http://localhost:3000",
        // methods: ["GET", "POST"],
    }
});



const Pong = require('./public/Pong/Pong')
Pong.Pong(io)

const port = 5000;
server.listen(port, ()=>console.log(`Listening on port ${port}`));