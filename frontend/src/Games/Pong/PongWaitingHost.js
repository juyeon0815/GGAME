import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import io from "socket.io-client"
// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilities";

import * as fp from "fingerpose";
import { logSoftmax } from "@tensorflow/tfjs";
import Player from "./Player";

let socket;
const PongWaitingHost = (props) =>{

  let history = useHistory()
  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  const [currentUser, setCurrentUser] = useState();

  const enterCode = useRef()

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  //  const [canvas, csv] = useState(null);

  let ges;
  let players = [];
  let ref = useRef();

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  // const images = { thumbs_up: thumbs_up, victory: victory };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 50);
  };

  // 손모양 감지 부분
  const detect = async (net) => {
    // Check data is available

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand, " : hand");

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 4);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map((prediction) => prediction.confidence);
          const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
          console.log("무슨방향: ", gesture.gestures[maxConfidence].name);

          ges = gesture.gestures[maxConfidence].name;
          if (ges === "victory") {
            console.log("======위 방향 상상상=======");
          }
          if (ges === "thumbs_up") {
            console.log("=========아래 방향 하하하하=========");
          }
          // console.log("=============",ges);
          setEmoji(gesture.gestures[maxConfidence].name);
          // console.log(emoji);
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(()=>{
    socket = io.connect("http://localhost:80/pong");
    socket.emit("join room", roomNumber, nickName);

    socket.on('userList', (data) => {
      console.log(data);
      console.log(data.length)
      setCurrentUser(data.length);
    });

    ///////////////////
  
    let canvas = ref.current;
    let context = canvas.getContext("2d");

    let cvs = canvas;
    let ctx = context;

    // 탁구대 판
    ctx.fillStyle = "#202020";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    // 탁구대 선
    ctx.shadowBlur = 5; //Add some shadows to every element
    ctx.shadowColor = "#ddd"; //Silver

    //Draw the middle line
    ctx.beginPath();
    ctx.strokeStyle = "#ddd";
    ctx.moveTo(cvs.width / 2, 60);
    ctx.lineTo(cvs.width / 2, cvs.height);
    ctx.stroke();

    players = [new Player(), new Player()];
    // Ball.render(ctx);
    //  players.forEach(player => player.render(context));
    players[0].renderPlayer1(ctx);
    players[1].renderPlayer2(ctx);

    runHandpose();
  },[])

  const gameStart = ()=>{
    socket.emit('game start',roomNumber)
    history.push({
      pathname: "/pong",
      socket : socket
    })
  }

  const style = {
    marginRight: '10px',
    width: '30%'
  }

  const center = {
    textAlign : 'center'
  }
  return(
    <div>
      <h1>PongWaitingHost</h1>
        
        <div style={center}>
        <div>NAME : {nickName}</div>
        {/* 여기에 pingpon게임이랑 webcam 컴포넌트 추가!!!! */}
        <div>
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: 10,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: 10,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </div>
      <div>
        <canvas ref={ref} width="640" height="480"></canvas>
      </div>
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
          <button onClick={() => navigator.clipboard.writeText(enterCode.current.value)}>복사</button>
        </div>

        <div>{currentUser}명 대기중..
          <button onClick={gameStart}>게임시작</button>
        </div>
      </div>
      
     

    </div>
  )
}

export default PongWaitingHost