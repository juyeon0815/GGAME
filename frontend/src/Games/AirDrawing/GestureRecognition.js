import React, { useRef, useState, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose"; //입력에서 한 손 감지
import Webcam from "react-webcam";
import { drawHand } from "./Utilities";

import * as fp from "fingerpose"; //손가락 분류

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
        const GE = new fp.GestureEstimator([
          fp.Gestures.VictoryGesture,
          fp.Gestures.ThumbsUpGesture,
        ]);
        const gesture = await GE.estimate(hand[0].landmarks, 7); //4?는 뭘까?
        // console.log("gesture", gesture);

        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          // console.log(gesture.gestures);

          const confidence = gesture.gestures.map((prediction) => prediction.confidence);
          const maxConfidence = confidence.indexOf(Math.max.apply(null, confidence));
          let ges = gesture.gestures[maxConfidence].name;
          console.log(ges);
          if (ges === "victory") {
            props.direction(0);
          } else if (ges === "thumbs_up") {
            props.direction(1);
          }
        }
      } else {
        props.direction(2);
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  useEffect(() => {
    props.direction(1);
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
