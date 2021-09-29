const { clientList } = require("./PongState");

let URI = "/pong";

let object = {};

// router.get("pong/api/roomExist",(req,res)=>{
//     console.log("넘어온 데이터 : ", req.query.code)
//     res.send("잘넘어왔다!");
// })

// module.exports = router;

exports.pong = function (io, pong_state) {
  let namespace = io.of(URI);

  namespace.on("connection", function (socket) {
    console.log("PONG CONNECT : ", socket.id);

    socket.on("disconnect", function () {
      console.log("disconnected: ", socket.id);
      console.log(socket.roomId);
      pong_state.removeClient(socket.roomId, socket.id);
      namespace.to(socket.roomId).emit("userList", pong_state.clientList[socket.roomId]);
    });

    socket.on("send data", function (data) {
      namespace.to(socket.roomId).emit("receive data", data);
    });

    socket.on("join room", (roomId, name) => {
      console.log(roomId, "방에 접속하였습니다.");
      console.log("nickName: ", name);

      //disconnect할때 쉽게 방찾기 위해서 설정
      socket.roomId = roomId;

      socket.join(roomId);

      //방이 존재하면 입장, 없으면 생성하고 입장
      if (!pong_state.isExistRoom(roomId)) {
        pong_state.createRoom(roomId);
        pong_state.addClient(roomId, socket.id, name);
      } else {
        pong_state.addClient(roomId, socket.id, name);
      }

      console.log(pong_state.clientList);

      console.log(pong_state.clientList[roomId].length);
      namespace.to(roomId).emit("userList", pong_state.clientList[roomId]);
    });

    socket.on("game start", (data) => {
      console.log("게임을 시작할 방은 ", data);
      namespace.to(data).emit("start game");

      namespace.to(data).emit("userList", pong_state.clientList[data]);
    });
  });
};
