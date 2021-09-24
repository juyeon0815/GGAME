import React from "react"
import { Link } from 'react-router-dom'

class CreateRoom extends React.Component {
    
  render() {
    const {isOpen, close, code, enter} = this.props
    return (
      <div className={isOpen ? 'openModal modal' : 'modal'}>
        {isOpen ? (
          <section>
            <header>
                방 생성하기   
              <button className="close" onClick={close}>X</button>
            </header>
            <main>
              입장 코드 : {code}
            </main>
            <footer>
            <Link to={{
                pathname:"/pongwaiting/host",
                code : {code}
            }}>
              <button className="close" onClick={enter}>방 생성</button></Link>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}
export {
    CreateRoom,
}