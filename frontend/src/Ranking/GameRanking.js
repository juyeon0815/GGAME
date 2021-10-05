import React from 'react'

class GameRanking extends React.Component {
  render() {
    const podium_count = ['pod-1', 'pod-2', 'pod-3']
    const top3Style = [
      { r: 2, c: "#d6a21e" },
      { r: 0, c: "#d6cd1e" },
      { r: 1, c: "#bbbbbb" }
    ]

    return (
      <div className="rank-container">
        {/* 1-3위 */}
        <div className={this.props.game + "-leaders" + " leaders"}>
          <h2>{this.props.game} Game Ranking</h2>
          <ul>
            {this.props.top3.map((info, index) => (
              <li key={index}>
                <div className="lead-players">
                  {/* image? */}
                  <div className={(podium_count[index]) + ' podium'}>
                  <div className="ranking-lead" style={{ backgroundColor: top3Style[index].c }}>{top3Style[index].r + 1}</div>
                    <h4>{info.name}</h4>
                    <p>{info.score} 점</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* 1-10위 전체순위 */}
        <div className="board">
          <h2>Leaderboard</h2>
          <ul>
            {this.props.ranks&&this.props.ranks.map((info, index) => (
              <li key={index}>
                <div className="player-item">
                  <div className="player-item__photo">
                    <div className="ranking">{index + 1}</div>
                    {/* image? */}
                  </div>
                  <div className="player-item__info">
                    <h4>{ info.name }</h4>
                  </div>
                  <div className="player-item__points">
                    {/* image? */}
                    <p>{ info.score }</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default GameRanking