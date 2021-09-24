import React from "react"
import './Mainpage.css'

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
            <footer>
              <button onClick={close}>close</button>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}

class MakeRoom extends React.Component {
  render() {
    const {isOpen, close} = this.props
    return (
      <Modal isOpen={isOpen} close={close} footerBtn="submit">
        <div>
          <label for="new_room" className="modal-label">방 이름</label>
          <input
            type="text"
            name="new_room"
            placeholder="방 이름을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label for="new_nickname" className="modal-label">닉네임</label>
          <input
            type="text"
            name="new_nickname"
            placeholder="사용할 닉네임을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label for="info" className="modal-label">설명</label>
          <textarea
            type="text"
            name="new_room_info"
            placeholder="방에 대한 정보를 입력하세요"
            className="modal-textarea"
          />
        </div>
      </Modal>
    )
  }
}
export {
  Modal,
  MakeRoom,
}