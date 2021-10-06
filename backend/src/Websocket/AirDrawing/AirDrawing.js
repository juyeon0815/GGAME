let URI = "/air-drawing";

exports.airDrawing = function (io, state) {
  let namespace = io.of(URI);

  namespace.on("connection", function (socket) {
    console.log("AIR-DRAWING CONNECT : ", socket.id);

    socket.on("disconnect", function () {
      console.log("disconnected: ", socket.id);
      console.log(socket.roomId);
      state.removeClient(socket.roomId, socket.id);
      namespace.to(socket.roomId).emit("userList", state.clientList[socket.roomId].list);
    });

    // 해당 방 그림 초기화
    socket.on("clear canvas", () => {
      namespace.to(socket.roomId).emit("clear canvas");
    });

    // 해당 방 그림 그리는 데이터 전송
    socket.on("send data", (state) => {
      namespace.to(socket.roomId).emit("receive data", state); // 브로드 캐스잍
    });

    // 클라이언트로 정답 데이터 받아오기
    socket.on("send answer", (answer) => {
      let idx = state.clientList[socket.roomId].idx;
      let problem = state.clientList[socket.roomId].problem[idx];
      if (answer === problem) {
        console.log("정답입니다!");

        // 점수 올려주기
        let u = state.clientList[socket.roomId].list.findIndex((i) => i.socketId === socket.id);
        state.clientList[socket.roomId].list[u].score++;
        console.log(state.clientList[socket.roomId].list);

        state.clientList[socket.roomId].idx++;
        let idx = state.clientList[socket.roomId].idx;
        let nxtDrawer = state.clientList[socket.roomId].drawOrder[idx];
        let nxtProblem = state.clientList[socket.roomId].problem[idx];
        if (state.clientList[socket.roomId].idx === state.clientList[socket.roomId].list.length) {
          namespace.to(socket.roomId).emit("game end", state.clientList[socket.roomId].list);
        } else {
          console.log(idx + 1, "번째 그리는 사람 : ", nxtDrawer);
          console.log(idx + 1, "번째 문제 : ", nxtProblem);
          namespace.to(socket.roomId).emit("receive drawer", nxtDrawer); // 다음 제출자 알림
          namespace.to(nxtDrawer.socketId).emit("receive problem", nxtProblem); // 다음 순서에게 제시어 전송

          namespace.to(socket.roomId).emit("next order"); // 다음 차례
        }

        // 스코어 보드
        namespace.to(socket.roomId).emit(
          "score board",
          state.clientList[socket.roomId].list.sort(function (a, b) {
            return b.score - a.score;
          })
        );
      }
      console.log(answer);
    });

    socket.on("join room", (roomId, name) => {
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

      console.log(state.clientList[roomId].list.length);
      namespace.to(roomId).emit("userList", state.clientList[roomId].list);
    });

    socket.on("game start", (data) => {
      namespace.to(data).emit("start game"); // 클라이언트에게 게임이 시작했다고 알림
      namespace.to(data).emit("userList", state.clientList[data].list);
      state.startGame(data); // 데이터 관리.
      let idx = state.clientList[socket.roomId].idx;
      let drawer = state.clientList[socket.roomId].drawOrder[idx];
      let problem = state.clientList[socket.roomId].problem[idx];
      console.log(idx + 1, "번째 그리는 사람 : ", drawer);
      console.log(idx + 1, "번째 문제 : ", problem);
      namespace.to(socket.roomId).emit("receive drawer", drawer);
      namespace.to(drawer.socketId).emit("receive problem", problem);
      // 스코어 보드 전송
      namespace.to(socket.roomId).emit(
        "score board",
        state.clientList[socket.roomId].list.sort(function (a, b) {
          return b.score - a.score;
        })
      );
    });
  });
};
