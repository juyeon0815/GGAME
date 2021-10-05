import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import GameCanvas from "./GameCanvas";
import GestureRecognition from "./GestureRecognition";

const AirDrawingGuest = (props) => {
  let history = useHistory();
  const nickName = props.history.location.newNickName;
  const roomNumber = props.history.location.roomId;
  const [isDrawing, setIsDrawing] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const socket = io.connect("https://j5a104.p.ssafy.io/air-drawing");
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
      </div>
    </div>
  );
};

export default AirDrawingGuest;
