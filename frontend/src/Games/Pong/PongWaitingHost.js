import React, {useEffect, useRef, useState} from 'react'
import io from "socket.io-client"

const PongWaitingHost = (props) =>{

  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  const [currentUser, setCurrentUser] = useState();

  const enterCode = useRef()

  useEffect(()=>{
    const socket = io.connect("http://localhost:5000/pong");
    socket.emit("join room", roomNumber);

    socket.on('currentUser',(data)=>{
      setCurrentUser(data);
    })
  },[])

  const gameStart = ()=>{
    alert("버튼클릭!");
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