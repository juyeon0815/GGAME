import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import io from "socket.io-client"

const PongWaitingGuest = (props) =>{

  let history = useHistory()
  const nickName = props.history.location.newNickName;
  const roomNumber = props.history.location.roomId;

  useEffect(()=>{
    const socket = io.connect("http://localhost:80/pong");
    socket.emit("join room", roomNumber, nickName);

    socket.on("start game",()=>{
      history.push({
        pathname: "/pong",
        socket : socket
      })
    })
  },[])

  return(
    <div>
      <div>PongWaitingGuest</div>

      <div>
        <div>NAME : {nickName}</div>
      </div>

    </div>
  )
}

export default PongWaitingGuest