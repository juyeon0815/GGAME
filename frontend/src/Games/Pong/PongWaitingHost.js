import React, {useEffect, useRef} from 'react'

const PongWaitingHost = (props) =>{
  const enterCode = useRef()
  const roomNumber = props.history.location.newRoom;
  const nickName = props.history.location.newNickName;

  useEffect(()=>{

  })
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
      </div>

    </div>
  )
}

export default PongWaitingHost