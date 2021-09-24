import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'


import io from "socket.io-client";
const socket = io.connect("http://localhost:5000/pong");
let code;

function GuestEnterCode (pros){

    useEffect(()=>{
        socket.on('start game', (data)=>{
            console.log(data)
        })
    })
    
    function enterCode(e){
        console.log(e.target.value);
        code = parseInt(e.target.value);
    }

    function enterRoom(){
        socket.emit("join room", code);

        socket.on('msg', (data)=>{
            console.log('data :',data);
        })
    }

        return(
            <div className={pros.isOpen ? 'openModal modal' : 'modal'}>
            {pros.isOpen ? (
              <section>
                <header>
                    방 참가하기   
                  <button className="close" onClick={pros.close}>X</button>
                </header>
                <main>
                  입장 코드 : 
                  <input onChange={enterCode}></input>
                </main>
                <footer>
                <Link to="/pongwaiting/guest">
                  <button className="close" onClick={enterRoom}>방 입장</button></Link>
                </footer>
              </section>
            ) : null}
          </div>
        )

}

export {
    GuestEnterCode,
}