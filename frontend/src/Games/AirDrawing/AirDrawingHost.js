import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import GameCanvas from "./GameCanvas";
import GestureRecognition from "./GestureRecognition";

let socket;

const AirDrawingHost = (props) => {
  let history = useHistory();
  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  const [currentUser, setCurrentUser] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [pos, setPos] = useState([0, 0]);

  const enterCode = useRef();

  useEffect(() => {
    socket = io.connect("http://localhost:80/air-drawing");
    socket.emit("join room", roomNumber, nickName);

    socket.on("userList", (data) => {
      setCurrentUser(data.length);
    });
  }, []);

  const gameStart = () => {
    if (currentUser < 2) {
      alert("최소 2명의 플레이어가 필요합니다.");
    } else {
      socket.emit("game start", roomNumber);
      history.push({
        pathname: "/air-drawing",
        socket: socket,
        nickName: nickName,
      });
    }
  };

  const style = {
    marginRight: "10px",
    width: "30%",
  };

  const center = {
    textAlign: "center",
  };
  return (
    <div>
      <h1>PongWaitingHost</h1>

      <div>
        <div style={center}>NAME : {nickName}</div>
        {/* 여기에 pingpon게임이랑 webcam 컴포넌트 추가!!!!! */}
        <p id="game_menu"></p>
        <div style={center}>
          <div>
            <input
              type="text"
              id="enter_room_host"
              className="modal-input"
              value={roomNumber}
              ref={enterCode}
              style={style}
              disabled
            />
            <button onClick={() => navigator.clipboard.writeText(enterCode.current.value)}>
              복사
            </button>
          </div>

          <div>
            <GameCanvas isDrawing={isDrawing} pos={pos} />
            <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
          </div>

          <div>
            {currentUser}명 대기중..
            <button onClick={gameStart}>게임시작</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirDrawingHost;
