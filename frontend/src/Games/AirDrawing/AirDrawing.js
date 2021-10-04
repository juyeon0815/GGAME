import React, { useEffect, useRef, useState } from "react";
import MultiGameCanvas from "./MultiGameCanvas";
import GestureRecognition from "./GestureRecognition";
import { div } from "@tensorflow/tfjs-core";
import VideoConference from "./VideoConference/VideoConference";

const AirDrawingHost = (props) => {
  const nickName = props.location.nickName;
  const [isDrawing, setIsDrawing] = useState(false);
  const [pos, setPos] = useState([0, 0]);
  const [answer, setAnswer] = useState(""); // 보내려는 정답 input
  const [problem, setProblem] = useState(""); // 현재 문제
  const [drawer, setDrawer] = useState({}); // 현재 그리는 사람
  const [gamePlaying, setGamePlaying] = useState(true); // 게임이 진행중이지 않으면 false
  const [scoreBoard, setScoreBoard] = useState([]);

  const onChange = (e) => {
    setAnswer(e.target.value);
  };

  // 정답 서버로 전송
  const sendAnswer = () => {
    if (answer) {
      props.location.socket.emit("send answer", answer);
      setAnswer(""); // 공백
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      sendAnswer();
    }
  };

  useEffect(() => {
    console.log(nickName);
    props.location.socket.on("receive problem", (p) => {
      setProblem(p);
    });

    // 게임이 종료되었는가?
    props.location.socket.on("game end", (state) => {
      setGamePlaying(false);
    });

    props.location.socket.on("score board", (data) => {
      console.log(data);
      const newScoreBoard = data;
      setScoreBoard(newScoreBoard);
    });

    props.location.socket.on("receive drawer", (d) => {
      if (d.socketId !== props.location.socket.id) {
        setProblem("");
      }
      setDrawer(d);
    });
  }, []);

  const center = {
    textAlign: "center",
  };
  return (
    <div>
      <h1>PongWaitingHost</h1>
      <VideoConference roomId={props.location.roomId} username={nickName} />

      {gamePlaying ? (
        <div>
          <p id="game_menu"></p>
          <div style={center}>
            <div>
              <h3>내 ID : {nickName}</h3>
              <h1>차례 : {drawer.nickname}</h1>
              <h2>제시어 : {problem}</h2>

              {/* 스코어 보드 */}
              {scoreBoard.map((client) => (
                <div key={client.socketId}>
                  id : {client.nickname} score: {client.score}
                </div>
              ))}

              <MultiGameCanvas
                socket={props.location.socket}
                isDrawing={isDrawing}
                pos={pos}
                drawer={drawer}
              />

              {/* 그림 그리는 사람만 모션 인식 */}
              {props.location.socket.id === drawer.socketId ? (
                <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
              ) : (
                <div />
              )}

              {/* 그림안그리는 사람만 정답 제출 가능 */}
              {props.location.socket.id !== drawer.socketId ? (
                <div>
                  <input onChange={onChange} onKeyPress={onCheckEnter} value={answer} />
                  <button onClick={sendAnswer}>제출</button>
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      ) : (
        // 게임 종료 화면
        <div>
          <h1>게임이 끝났습니다!</h1>

          {/* 스코어 보드 */}
          {scoreBoard.map((client) => (
            <div key={client.socketId}>
              id : {client.nickname} score: {client.score}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AirDrawingHost;
