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
  }, []);

  return (
    <div>
      <div>Airdrawing Waiting Room</div>
      <GameCanvas isDrawing={isDrawing} pos={pos} />
      <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
      <div>
        <div>NAME : {nickName}</div>
      </div>
    </div>
  );
};

export default AirDrawingGuest;
