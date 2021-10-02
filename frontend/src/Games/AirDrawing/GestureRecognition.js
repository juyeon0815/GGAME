import React, { useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose"; //입력에서 한 손 감지
import Webcam from "react-webcam";
import { drawHand } from "./Utilities";

function GestureRecognition(props) {
  //useRef는 .current 프로퍼티로 전달된 인자를 초기화된 변경 가능한 ref객체 반환
  //useRef로 관리하는 변수는 값이 바뀐다고해서 컴포넌트 리렌더링 x
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load(); //손 감지 모델 로드
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      //일정한 시간간격으로 작업 실행
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    //손이 감지되면
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
      //   console.log("hand",hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        let x = hand[0].landmarks[0][0];
        let y = hand[0].landmarks[0][1];
        // console.log(x, y);
        props.setPos([x, y]);
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            // marginLeft: "auto",
            // marginRight: "auto",
            // left: 0,
            // right: 0,
            // textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "relative",
            // marginLeft: "auto",
            // marginRight: "auto",
            // left: 0,
            // right: 0,
            // textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default GestureRecognition;
