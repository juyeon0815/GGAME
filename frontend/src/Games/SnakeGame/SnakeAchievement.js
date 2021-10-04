import React from 'react'
import { Link } from 'react-router-dom'

class SnakeAchievement extends React.Component {
  render() {
    const {isOpen, close, footerBtn, footerBtnName} = this.props
    return (
      <div className={isOpen ? "snake-modal snake-open-modal" : "snake-modal"}>
        {isOpen ? (
          <section>
            <header>
              <button onClick={close}>X</button>
            </header>
            <main className="main-box">
              <h2>새로운 업적이 달성되었습니다!</h2>
              <p></p>
              <p>마이페이지에서 확인해보세요!</p>
            </main>
            <footer>
            <Link to="/mypage/user">
              <button>마이페이지로 이동</button>
            </Link>
            </footer>
          </section>
        ) : null}
      </div>
    )
  }
}

export default SnakeAchievement