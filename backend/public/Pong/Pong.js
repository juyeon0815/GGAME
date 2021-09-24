let URI = "/pong"

exports.Pong = function (io) {
    let namespace = io.of(URI);

    console.log("여기는와?")
    namespace.on('connection', function (socket){
        console.log("PONG CONNECT : ", socket.id);
        

        socket.on('disconnect', function(){
            console.log('user disconnected: ', socket.id);
        });

        socket.on("join room", (roomId) => {
            // roomId 에 입장
            console.log(roomId, "방에 접속하였습니다.");
            socket.join(roomId);

            namespace.to(roomId).emit('msg', "방에 새로운사람이 접속했습니다.")
        });

    });
}
