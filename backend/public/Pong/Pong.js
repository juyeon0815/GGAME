// const express = require("express")
// const router = express.Router();

let URI = "/pong"


let object = {}

// router.get("pong/api/roomExist",(req,res)=>{
//     console.log("넘어온 데이터 : ", req.query.code)
//     res.send("잘넘어왔다!");
// })

// module.exports = router;

exports.pong = function (io) {
    let namespace = io.of(URI);

    namespace.on('connection', function (socket){
        console.log("PONG CONNECT : ", socket.id);
        

        socket.on('disconnect', function(){
            console.log('namespace disconnected: ', socket.id);
        });

        socket.on("join room", (roomId) => {
            // roomId 에 입장
            console.log(roomId, "방에 접속하였습니다.");
            socket.join(roomId);
            
            if(!object[roomId]) object[roomId] = [];
            object[roomId].push(socket.id);

            console.log(object)

            console.log(object[roomId].length);
            
            namespace.to(roomId).emit('msg', `방에 새로운사람이 접속했습니다.`)
            namespace.to(roomId).emit('currentUser',object[roomId].length)


        });

        socket.on('game start', (data)=>{
            console.log('게임을 시작할 방은 ', data)

            namespace.to(data).emit('start game','게임을 시작합니다.')
        })

    });
}
