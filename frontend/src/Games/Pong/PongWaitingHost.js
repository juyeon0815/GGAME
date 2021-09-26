import React, {useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom';


import io from "socket.io-client";

let socket
function PongWaitingHost (props) {

  const [currentUser, setCurrentUser] = useState();

  useEffect(()=>{
    socket = io.connect("http://localhost:5000/pong");
    console.log("socket", socket)
    console.log("namespace 연결 완료!");
    console.log(props.location.code.code)

    socket.emit("join room", props.location.code.code);

    socket.on('msg', (data)=>{
      console.log('data :',data);
    })

    socket.on('currentUser',(data)=>{
      console.log('currentUser: ',data)
      setCurrentUser(data);
    })

  },[])

  

  function gameStart(){
    alert("게임시작!");
    socket.emit('game start',props.location.code.code)
  }

    return (
      <div>
        <h1>PongWaitingHost</h1>
        <h2>현재 참여인원은 {currentUser}</h2>
        <div>방 번호 : {props.location.code.code}</div>
        <Link to={{
          pathname:"/pong",
          socket : socket
          }}>
        <button onClick={gameStart}>게임시작</button>
        </Link>
      </div>
    )
}

export default PongWaitingHost