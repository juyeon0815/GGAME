import React, {useEffect, useState} from 'react'

let cu;
function Pong (props) {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(()=>{
    let so = props.location.socket;

    so.on("currentUser", (data)=>{
      console.log("data: ", data)
      console.log("data length : " ,data.length);
      
      for(let i=0;i<data.length;i++){
        setCurrentUser((currentUser)=> currentUser.concat(data[i]+" / "));
      }
    })

  },[])
    return (
      <div>
        <h1>Pong</h1>
        <div>현재 참여자 목록 </div>
        <div>{currentUser}</div>
      </div>
    )

}

export default Pong

//여기에 전체 참여자 뿌려줘야지