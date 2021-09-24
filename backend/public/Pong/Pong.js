let URI = "/pong"


let object = {}

exports.Pong = function (io) {
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
