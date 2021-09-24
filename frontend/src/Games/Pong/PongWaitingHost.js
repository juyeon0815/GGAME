import React from 'react'


import io from "socket.io-client";


class PongWaitingHost extends React.Component {

  componentWillMount(){
    const socket = io.connect("http://localhost:5000/pong");
    console.log("namespace 연결 완료!");
    console.log(this.props.location.code.code)

    socket.emit("join room", this.props.location.code.code);

    socket.on('msg', (data)=>{
      console.log('data :',data);
    })
  }

  render() {
    return (
      <div>
        <h1>PongWaitingHost</h1>
      </div>
    )
  }
}

export default PongWaitingHost