import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import io from "socket.io-client";

const BASE_URL = "http://localhost:80/";
let socket;

const getPixelRatio = (context) => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};

const Circle = () => {
  let ref = useRef();
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  let isPress = [false, false, false, false]; // 상하좌우

  useEffect(() => {
    let x = 300,
      y = 300;

    let canvas = ref.current;
    let context = canvas.getContext("2d");

    let ratio = getPixelRatio(context);
    let width = 600;
    let height = 600;

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    let requestId;
    const SPEED = 2;

    const keyIdle = () => {
      if (isPress[0]) y -= SPEED;
      if (isPress[1]) y += SPEED;
      if (isPress[2]) x -= SPEED;
      if (isPress[3]) x += SPEED;
    };

    const draw = () => {
      keyIdle();
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.fillRect(x, y, 30, 30);
      context.fill();
    };

    const render = () => {
      draw();
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  const handleKeyDown = (e) => {
    switch (e.keyCode) {
      case 37: // 좌
        isPress[2] = true;
        break;
      case 38: // 상
        isPress[0] = true;
        break;
      case 39: // 우
        isPress[3] = true;
        break;
      case 40: // 하
        isPress[1] = true;
        break;
      default:
        break;
    }

    console.log(e);
  };

  const handleKeyUp = (e) => {
    switch (e.keyCode) {
      case 37: // 좌
        isPress[2] = false;
        break;
      case 38: // 상
        isPress[0] = false;
        break;
      case 39: // 우
        isPress[3] = false;
        break;
      case 40: // 하
        isPress[1] = false;
        break;
      default:
        break;
    }
  };

  const joinCharade = () => {
    console.log("CHARADE NAMESPACE 접속");
    socket = io.connect(BASE_URL + "charade");
    socket.on("connect", () => {
      socket.emit("send message");

      socket.on("receive message", (item) => {
        console.log("CHARADE : ", item);
      });

      socket.on("room msg", (roomId) => {
        console.log(roomId, "에서 ");
      });
    });

    return;
  };

  const joinPong = () => {
    console.log("PONG NAMESPACE 접속");
    socket = io.connect(BASE_URL + "pong");
    socket.on("connect", () => {
      socket.emit("send message");
      socket.on("receive message", (item) => {
        console.log("PONG : ", item);
      });

      socket.on("room msg", (roomId) => {
        console.log(roomId, "에서 ");
      });
    });

    return;
  };

  const sendPing = () => {
    socket.emit("send message");
  };

  const joinRoom = () => {
    socket.emit("join room", text);
  };

  const sendMsgRoom = () => {
    socket.emit("send room", text);
  };

  return (
    <div>
      <button onClick={joinPong}>핑퐁</button>
      <button onClick={joinCharade}>캐치마인드</button>
      <button onClick={sendPing}>네임스페이스에 데이터 전송</button>
      <input placeholder="방이름" onChange={onChange} value={text} />
      <button onClick={joinRoom}>방 입장</button>
      <button onClick={sendMsgRoom}>방에 메세지 보내기</button>

      <canvas tabIndex="0" ref={ref} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} />
    </div>
  );
};

export default Circle;
