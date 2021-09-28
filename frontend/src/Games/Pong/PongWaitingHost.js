import React, {useEffect, useRef, useState} from 'react'
import { useHistory } from 'react-router-dom'
import io from "socket.io-client"

let socket;
const PongWaitingHost = (props) =>{

  let history = useHistory()
  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  const [currentUser, setCurrentUser] = useState();

  const enterCode = useRef()

  useEffect(()=>{
    socket = io.connect("http://localhost:80/pong");
    socket.emit("join room", roomNumber, nickName);

    socket.on('userList',(data)=>{
      console.log(data);
      console.log(data.length)
      setCurrentUser(data.length);
    })

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
  return(
    <div>
      <div>PongWaitingHost</div>

      <div>
        <div>NAME : {nickName}</div>
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