var URI = "/charade"

exports.initChar = function (io) {
    var namespace = io.of(URI);
    
    namespace.on('connection', function (socket){
        console.log("CHARADE CONNECT : ", socket.id);

        socket.on("join room", (roomId) => {//send message 이벤트 발생
            // roomId 에 입장
            console.log(roomId, "방에 접속하였습니다.");
            socket.join(roomId);
        });

        socket.on("send room", (roomId) => {
            console.log("A",roomId);
            namespace.to(roomId).emit("room msg",msg);
        });

        socket.on("send message", () => {//send message 이벤트 발생
            console.log("CHARADE 서버 도착");
            namespace.emit("receive message", "접속 : " +socket.id);
            //클라이언트에 이벤트를 보냄
        });
    });
}