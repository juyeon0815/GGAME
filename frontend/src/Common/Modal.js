import React from "react"
import './Modal.css'

class Modal extends React.Component {
  render() {
    const {isOpen, close} = this.props
    return (
      <div className={isOpen ? "modal open-modal" : "modal"}>
        {isOpen ? (
          <section>
            <header>
              <button onClick={close}>X</button>
            </header>
            <main className="main-box">
              {this.props.children}
            </main>
            {/* <footer>
              <button onClick={close}>close</button>
            </footer> */}
          </section>
        ) : null}
      </div>
    )
  }
}

export default Modal
