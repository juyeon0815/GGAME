import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import GameCanvas from "./GameCanvas";
import GestureRecognition from "./GestureRecognition";
import "./AirDrawingHost.css";
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
    
    const io = require('socket.io-client');
    const socket = io.connect("https://j5a104.p.ssafy.io/air-drawing", { secure: true, reconnect: true });
    
    socket.emit("join room", roomNumber, nickName);

    socket.on("userList", (data) => {
      setCurrentUser(data.length);
    });
  }, []);

  const gameStart = () => {
    socket.broadcast.emit("game start", roomNumber);
    history.push({
      pathname: "/air-drawing",
      socket: socket,
      nickName: nickName,
      roomId: roomNumber,
    });

    // if (currentUser < 2) {
    //   alert("최소 2명의 플레이어가 필요합니다.");
    // } else {
    //   socket.emit("game start", roomNumber);
    //   history.push({
    //     pathname: "/air-drawing",
    //     socket: socket,
    //     nickName: nickName,
    //     roomId: roomNumber,
    //   });
    // }
  };

  const style = {
    marginRight: "10px",
    width: "30%",
  };

  const center = {
    textAlign: "center",
  };
  return (
    <div className="air-drawing">
      {/* 여기에 pingpon게임이랑 webcam 컴포넌트 추가!!!!! */}
      <p id="game_menu"></p>
      <div style={center}>
        <h1>대기실</h1>
        <div style={center}>NAME : {nickName}</div>

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

        <div className="game-row">
          <div className="game-left">
            <GameCanvas isDrawing={isDrawing} pos={pos} />
          </div>
          <div className="game-right">
            <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
          </div>
        </div>

        <button class="btn-start" onClick={gameStart}>
          <span>Game Start</span>
        </button>
        <div>{currentUser}명 대기중..</div>
      </div>
    </div>
  );
};

export default AirDrawingHost;
