import React from "react"
import './Mainpage.css'

class NestedModal extends React.Component {
  render() {
    const { isOpen, close, footerBtn, footerBtnName } = this.props
    return (
      <div className={isOpen ? "modal open-modal" : "modal"}>
        {isOpen ? (
          <section>
            <header>
              <button onClick={() => { close(); this.props.isShowEnter() }}>X</button>
            </header>
            <main className="main-box">
              {this.props.children}
            </main>
            <footer>
              {/* <button onClick={() => { close(); footerBtn() }}>{footerBtnName}</button> */}
              <button onClick={() => { footerBtn() }}>{footerBtnName}</button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}

export default NestedModal
