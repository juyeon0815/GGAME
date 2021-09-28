import React, {useEffect, useState} from 'react'

const Pong = (props) =>{

  const [clientList, setClientList] = useState([]);

  useEffect(()=>{
    let socket = props.location.socket;

    socket.on("userList", (data)=>{
      console.log(data);
      const list = data;
      setClientList(list);
    })
  })

  return(
    <div>
      <h1>Pong</h1>
      <div>현재 참여자 목록</div>
      {clientList.map((user)=>(
        <div key={user.socketId}>
          id : {user.socketId},
          nickName : {user.nickname}
        </div>
      ))}
    </div>
  )
}

export default Pong