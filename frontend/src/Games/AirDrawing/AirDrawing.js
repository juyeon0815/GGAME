import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import MultiGameCanvas from "./MultiGameCanvas";
import GestureRecognition from "./GestureRecognition";
import { div } from "@tensorflow/tfjs-core";
// import VideoConference from "./VideoConference/VideoConf";
import VideoConference from "./VideoConference/VideoConference";
import "./AirDrawing.css";
import Leaderboard from "./Leaderboard";

const AirDrawingHost = (props) => {
  let history = useHistory();
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

  const exitGame = () => {
    history.push({
      pathname: "/",
    });
  };

  useEffect(() => {
    props.location.socket.on("receive problem", (p) => {
      setProblem(p);
    });

    // 게임이 종료되었는가?
    props.location.socket.on("game end", (data) => {
      setGamePlaying(false);

      let myRank, myScore;

      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (data[i].nickname === nickName) {
          myRank = i + 1;
          myScore = data[i].score;
        }
      }

      let token = sessionStorage.getItem("token");
      axios
        .get("https://j5a104.p.ssafy.io/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          axios({
            method: "post",
            url: "https://j5a104.p.ssafy.io/game/air-draw",
            data: { email: res.data.data[0].email, rank: myRank, score: myScore },
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              axios
                .get("https://j5a104.p.ssafy.io/game/air-draw/new-achievement", {
                  params: { email: res.data.data[0].email },
                })
                .then((res) => {})
                .catch((error) => {});
            })
            .catch((response) => {
              console.log(response);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });

    props.location.socket.on("score board", (data) => {
      const newScoreBoard = data;
      setScoreBoard(newScoreBoard);
    });

    props.location.socket.on("receive drawer", (d) => {
      if (d.socketId !== props.location.socket.id) {
        setProblem("");
      }
      setDrawer(d);
    });
    return () => {
      props.location.socket.close();
    };
  }, []);

  return (
    <div className="air-drawing">
      {gamePlaying ? (
        <div>
          <VideoConference roomId={props.location.roomId} username={nickName} />
          <div className="game-info">
            <h3>내 ID : {nickName}</h3>
            <h3>{drawer.nickname}님이 손을 움직이는 중...</h3>
          </div>

          {props.location.socket.id === drawer.socketId ? (
            <div className="game-row">
              <div className="game-left">
                <MultiGameCanvas
                  socket={props.location.socket}
                  isDrawing={isDrawing}
                  pos={pos}
                  drawer={drawer}
                  nickname={props.location.nickName}
                />
              </div>
              <div className="game-right">
                <GestureRecognition isDrawing={setIsDrawing} setPos={setPos} />
              </div>
            </div>
          ) : (
            <div className="game-row">
              <div className="game-center">
                <MultiGameCanvas
                  socket={props.location.socket}
                  isDrawing={isDrawing}
                  pos={pos}
                  drawer={drawer}
                />
              </div>
            </div>
          )}

          {/* 그림안그리는 사람만 정답 제출 가능 */}
          {props.location.socket.id !== drawer.socketId ? (
            <div className="answer-form">
              <input
                className="answer-input"
                onChange={onChange}
                onKeyPress={onCheckEnter}
                placeholder="정답"
                value={answer}
              />
              <button className="btn-ans" onClick={sendAnswer}>
                제출
              </button>
            </div>
          ) : (
            <div className="answer-form">
              <h1>제시어 : {problem}</h1>
            </div>
          )}

          {/* 스코어 보드 */}
          <div className="score-board">
            {scoreBoard.slice(0, 5).map((client, index) => (
              <div className="score" key={client.socketId}>
                {index + 1}등 {client.nickname} {client.score}점
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 게임 종료 화면
        <div>
          <Leaderboard score={scoreBoard} nickname={nickName} />
          <button className="btn-home" onClick={exitGame}>
            메인으로
          </button>
        </div>
      )}
    </div>
  );
};

export default AirDrawingHost;
