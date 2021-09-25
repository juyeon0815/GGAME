import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
let socket
function PongWaitingGuest (props) {
  const history = useHistory();
  useEffect(()=>{
    console.log("넘어온데이터",props.location.enterCode)
    socket = io.connect("http://localhost:5000/pong");

    socket.emit("join room", props.location.enterCode);

    socket.on('msg', (data)=>{
      console.log('data :',data);
    })
    socket.on('start game', (data)=>{
        console.log(data)
        history.push({
          pathname:"/pong",
          socket : socket
        })
    })
  })

    return (
      <div>
        <h1>PongWaitingGuest</h1>
      </div>
    )
}

export default PongWaitingGuest