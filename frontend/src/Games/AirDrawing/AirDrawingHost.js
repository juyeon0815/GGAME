import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import GameCanvas from "./GameCanvas";
import GestureRecognition from "./GestureRecognition";
import { AirDrawingRule } from "./AirDrawingRule";
import "./AirDrawingHost.css";
let socket;

const AirDrawingHost = (props) => {
  let history = useHistory();
  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  const [currentUser, setCurrentUser] = useState();
  const [isDrawing, setIsDrawing] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [showPR, setShowPR] = useState();

  const enterCode = useRef();

  useEffect(() => {
    socket = io.connect("http://localhost:80/air-drawing");
    socket.emit("join room", roomNumber, nickName);

    socket.on("userList", (data) => {
      setCurrentUser(data.length);
    });
  }, []);

  const gameStart = () => {
    socket.emit("game start", roomNumber);
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
        <div style={center}>NAME : {nickName}</div>

        <div className="game-row">
          <div className="game-left">
            <GameCanvas isDrawing={isDrawing} pos={pos} />
          </div>
          <div className="game-right">
            <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
          </div>
        </div>

        <button className="btn-start" onClick={gameStart}>
          <span>Game Start</span>
        </button>

        <button className="btn-pong btn-pong-rule" onClick={() => setShowPR(true)}>
          게임방법
        </button>
        <AirDrawingRule isOpen={showPR} close={() => setShowPR(false)} />
        <div>{currentUser}명 대기중..</div>
      </div>
    </div>
  );
};

export default AirDrawingHost;
