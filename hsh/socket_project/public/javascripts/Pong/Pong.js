var URI = "/pong"

exports.initPong = function (io) {
    var namespace = io.of(URI);
    
    namespace.on('connection', function (socket){
        console.log("PONG CONNECT : ", socket.id);

        socket.on("join room", (roomId) => {//send message 이벤트 발생
            // roomId 에 입장
            console.log(roomId, "방에 접속하였습니다.");
            socket.join(roomId);
        });

        socket.on("send room", (roomId) => {
            console.log(roomId);
            namespace.to(roomId).emit("room msg",roomId,socket.id);
        });

        socket.on("send message", () => {//send message 이벤트 발생
            console.log("PONG 서버 도착");
            namespace.emit("receive message", socket.id);
            //클라이언트에 이벤트를 보냄
        });
    });
}