import React from 'react'
import { Link } from 'react-router-dom'

class PongAchievement extends React.Component {
  render() {
    const {isOpen, close, achievement} = this.props
    const trophyPong = {
      'pong_first': '첫 게임',
      'scd_round': '2라운드에 진입한 자',
      'trd_round': '3라운드에 진입한 자',
      'pong_master': '핑퐁 마스터',
      'pong_champ': '핑퐁 챔피언',
      'win_ai': 'AI를 재패한 자',
    }

    return (
      <div className={isOpen ? "snake-modal snake-open-modal" : "snake-modal"}>
        {isOpen ? (
          <section>
            <header>
              <button onClick={close}>X</button>
            </header>
            <main className="main-box">
              <h2>새로운 업적이 달성되었습니다!</h2>
              {achievement.map((achieve, index) => (
                <h2 key={index}>'{trophyPong[achieve]}'</h2>
              ))}
              <h2>마이페이지에서 확인해보세요!</h2>
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

export default PongAchievement