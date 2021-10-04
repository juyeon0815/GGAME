import React from 'react'
import { Link } from 'react-router-dom'

class SnakeAchievement extends React.Component {
  render() {
    const {isOpen, close, achievement} = this.props
    const trophySnake = {
      'snake_first': '첫 게임',
      'light_eating': '소식',
      'over_eating': '과식',
      'great_eater': '대식가',
      'apple_like': '사과가 좋아',
      'apple_love': '사과가 너무 좋아',
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
                <h2 key={index}>'{trophySnake[achieve]}'</h2>
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

export default SnakeAchievement