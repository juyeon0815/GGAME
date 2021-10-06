import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import GameCanvas from "./GameCanvas";
import GestureRecognition from "./GestureRecognition";
import { Link } from "react-router-dom";
import { AirDrawingRule } from "./AirDrawingRule";

const AirDrawingGuest = (props) => {
  let history = useHistory();
  const nickName = props.history.location.newNickName;
  const roomNumber = props.history.location.roomId;
  const [isDrawing, setIsDrawing] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [currentUser, setCurrentUser] = useState();
  const [showPR, setShowPR] = useState();

  useEffect(() => {
    const socket = io.connect("http://localhost:80/air-drawing");
    socket.emit("join room", roomNumber, nickName);

    socket.on("start game", () => {
      history.push({
        pathname: "/air-drawing",
        socket: socket,
        nickName: nickName,
        roomId: roomNumber,
      });
    });
    socket.on("userList", (data) => {
      setCurrentUser(data.length);
    });
  }, []);

  const center = {
    textAlign: "center",
  };

  return (
    <div>
      <div style={center}>
        <h1>대기실 </h1>
        <div>
          <h1>NAME : {nickName}</h1>
        </div>
        <div className="game-row">
          <div className="game-left">
            <GameCanvas isDrawing={isDrawing} pos={pos} />
          </div>
          <div className="game-right">
            <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
          </div>
        </div>
        <h1>{currentUser}명 대기중..</h1>
        <h2>잠시만 기다려 주세요!</h2>

        <button className="btn-airdraw btn-airdraw-rule" onClick={() => setShowPR(true)}>
          게임방법
        </button>
        <AirDrawingRule isOpen={showPR} close={() => setShowPR(false)} />
        <Link to="/">
          <button className="btn-airdraw btn-airdraw-out">게임 나가기</button>
        </Link>
      </div>
    </div>
  );
};

export default AirDrawingGuest;
