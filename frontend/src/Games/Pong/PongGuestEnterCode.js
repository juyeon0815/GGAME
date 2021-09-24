import React from "react"
import { Link } from 'react-router-dom'


import io from "socket.io-client";

let code;

class GuestEnterCode extends React.Component{



    enterCode = (e)=>{
        console.log(e.target.value);
        code = e.target.value;
    }

    enterRoom = ()=>{
        const socket = io.connect("http://localhost:5000/pong");
        socket.emit("join room", code);

        socket.on('msg', (data)=>{
            console.log('data :',data);
        })
    }


    render(){
        const {isOpen, close} = this.props
        return(
            <div className={isOpen ? 'openModal modal' : 'modal'}>
            {isOpen ? (
              <section>
                <header>
                    방 참가하기   
                  <button className="close" onClick={close}>X</button>
                </header>
                <main>
                  입장 코드 : 
                  <input onChange={this.enterCode}></input>
                </main>
                <footer>
                <Link to="/pongwaiting/guest">
                  <button className="close" onClick={this.enterRoom}>방 입장</button></Link>
                </footer>
              </section>
            ) : null}
          </div>
        )
    }
}

export {
    GuestEnterCode,
}