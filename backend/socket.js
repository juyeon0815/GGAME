const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

let gameRooms = [];

io.on('connection', socket=>{

    console.log('connection on ',socket.id);
    io.emit('msg', socket.id);
    
    socket.on('disconnect', function(){
        console.log('user disconnected: ', socket.id);
    });

    socket.on('createRoom', function(data){
        console.log('createRoom', data);
        socket.join(data);
        gameRooms.push(data);
        console.log('배열에 잘 들어갔나~',gameRooms.length);
    })

    socket.on('enterRoom',function(data){
        console.log(data)
        console.log('enterRoom에 들어왔다!', gameRooms.length);
        for(let i=0; i<gameRooms.length;i++){
            console.log(i);
        }
    })
})

// server.listen(5000, function(){
//     console.log('listening on port 5000');
// })