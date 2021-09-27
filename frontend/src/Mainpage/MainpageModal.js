import React from "react"
import './Mainpage.css'
import { Link } from 'react-router-dom'

class Modal extends React.Component {
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
              {footerBtnName === 'create' ? 
                <button onClick={() => { footerBtn() }}>{footerBtnName}</button>
                :
                <Link
                  className="router-link-btn"
                  to={`/pongwaiting/${this.props.enterType}`}
                  onClick={() => { close(); footerBtn() }}
                >
                  {footerBtnName}
                </Link>
              }
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}

class ModalCommand extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isCreate: false,
      showEnterHost: false,
    }
    this.create = this.create.bind(this)
    this.isShowEnterHost = this.isShowEnterHost.bind(this)
  }
  create() {
    console.log('test')
    // 서버에 소켓 넘버 요청
    this.setState(() => {
      this.showEnterHost = true
    })
    this.forceUpdate()
  }
  isShowEnterHost() {
    this.setState(() => {
      this.showEnterHost = false
    })
  }
  render() {
    const { isOpen, close } = this.props
    if (!this.showEnterHost) {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          footerBtn={this.create}
          isShowEnter={this.isShowEnterHost}
          footerBtnName="create">
        <div>
          <label htmlFor="new_room" className="modal-label">방 이름</label>
          <input
            type="text"
            id="new_room"
            placeholder="방 이름을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label htmlFor="new_nickname" className="modal-label">닉네임</label>
          <input
            type="text"
            id="new_nickname"
            placeholder="사용할 닉네임을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label htmlFor="info" className="modal-label">설명</label>
          <textarea
            type="text"
            id="new_room_info"
            placeholder="방에 대한 정보를 입력하세요"
            className="modal-textarea"
          />
        </div>
      </Modal>
      )
    }
    else if (this.showEnterHost) {
      return (
        <Modal
          isOpen={isOpen}
          close={close}
          footerBtn={this.isShowEnterHost}
          isShowEnter={this.isShowEnterHost}
          enterType="host"
          footerBtnName="enter">
          <div>
            <input
              type="text"
              id="enter_room_host"
              className="modal-input"
              value="소켓 넘버"
              disabled
            />
          </div>
        </Modal>
      )
    }
    
  }
}

export {
  Modal,
  ModalCommand,
}