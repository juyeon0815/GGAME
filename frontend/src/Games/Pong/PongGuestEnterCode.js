import React, {useEffect, useState} from "react"
import { Link } from 'react-router-dom'
import axios from "axios"


function GuestEnterCode (pros){
    const [code, setCode] = useState()
   
    function enterCode(e){
        console.log(e.target.value);
        setCode(parseInt(e.target.value));
    }
    
    function enterRoom(){
        console.log("보내는 데이터 ", code);   
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
                <Link to={{
                  pathname:"/pongwaiting/guest",
                  enterCode : code
                }}>
                  <button className="close" onClick={enterRoom}>방 입장</button>
                  </Link>
                </footer>
              </section>
            ) : null}
          </div>
        )

}

export {
    GuestEnterCode,
}