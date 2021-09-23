import React from "react"
import './Mainpage.css'

class MakeRoom extends React.Component {
  render() {
    const {isOpen, close} = this.props
    return (
      <div className={isOpen ? 'openModal modal' : 'modal'}>
        {isOpen ? (
          <section>
            <header>
              <button className="close" onClick={close}>X</button>
            </header>
            <main>
              모달 테스트
            </main>
            <footer>
              <button className="close" onClick={close}>close</button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}
export {
  MakeRoom,
}