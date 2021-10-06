import React, { useState, useRef, useEffect } from "react";
import "./AirDrawing.css";

function GameCanvas(props) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    console.log(props.socket);
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 480;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;

    setCtx(context);
  }, []);

  useEffect(() => {
    let x = props.pos[0];
    let y = props.pos[1];

    if (ctx) {
      if (isDrawing) {
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }

    return () => {};
  }, [props.pos, isDrawing]);

  useEffect(() => {
    if (isDrawing) {
      document.querySelector("#wait-canvas").style.border = "5px solid red";
    } else {
      document.querySelector("#wait-canvas").style.border = "5px solid blue";
    }
    return () => {};
  }, [isDrawing]);

  const clearCanvas = () => {
    // 픽셀 정리
    if (ctx) {
      ctx.clearRect(0, 0, 640, 480);
      // 컨텍스트 리셋
      ctx.beginPath();
    }
  };

  const startDrawing = (e) => {
    if (e.keyCode === 32 && !isDrawing) {
      setIsDrawing(true);
    }
  };

  const finishDrawing = (e) => {
    if (e.keyCode === 32) {
      setIsDrawing(false);
    }
  };

  return (
    <div>
      <canvas
        className="wait-canvas"
        ref={canvasRef}
        tabIndex="0"
        id="wait-canvas"
        onKeyDown={startDrawing}
        onKeyUp={finishDrawing}
        width="700"
        height="700"
      />
      <br />

      <button className="btn-reset" onClick={clearCanvas}>
        초기화
      </button>
    </div>
  );
}

export default GameCanvas;
