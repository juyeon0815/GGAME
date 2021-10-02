let URI = "/air-drawing";

exports.airDrawing = function (io, state) {
  let namespace = io.of(URI);

  namespace.on("connection", function (socket) {
    console.log("AIR-DRAWING CONNECT : ", socket.id);

    socket.on("disconnect", function () {
      console.log("disconnected: ", socket.id);
      console.log(socket.roomId);
      state.removeClient(socket.roomId, socket.id);
      namespace.to(socket.roomId).emit("userList", state.clientList[socket.roomId]);
    });

    socket.on("join room", (roomId, name) => {
      console.log(roomId, "방에 접속하였습니다.");
      console.log("nickName: ", name);

      //disconnect할때 쉽게 방찾기 위해서 설정
      socket.roomId = roomId;

      socket.join(roomId);

      //방이 존재하면 입장, 없으면 생성하고 입장
      if (!state.isExistRoom(roomId)) {
        state.createRoom(roomId);
        state.addClient(roomId, socket.id, name);
      } else {
        state.addClient(roomId, socket.id, name);
      }

      console.log(state.clientList);

      console.log(state.clientList[roomId].length);
      namespace.to(roomId).emit("userList", state.clientList[roomId]);
    });

    socket.on("game start", (data) => {
      console.log("게임을 시작할 방은 ", data);
      namespace.to(data).emit("start game");

      namespace.to(data).emit("userList", state.clientList[data]);
    });
  });
};
