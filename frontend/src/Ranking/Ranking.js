import React, { useEffect } from 'react'
import axios from 'axios'
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ranks: [],
      top3: [{'name': 'player2', 'score': '20'}, {'name': 'player1', 'score': '30'}, {'name': 'player3', 'score': '10'}],
    }
  }

  componentDidMount() {
    // axios
    this.setState({ ranks: [{'name': 'player1', 'score': '30'}, {'name': 'player2', 'score': '20'}, {'name': 'player3', 'score': '10'}, {'name': 'player4', 'score': '5'}]})
  }

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
        <div className="leaders">
          <h2>Snake Game Ranking</h2>
          <ul>
            {this.state.top3.map((info, index) => (
              <li key={index}>
                <div className="lead-players">
                  {/* image? */}
                  <div className={(podium_count[index]) + ' podium'}>
                  <div className="ranking-lead" style={{ backgroundColor: top3Style[index].c }}>{top3Style[index].r + 1}</div>
                    <h4>{info.name}</h4>
                    <p>{info.score} points</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* 1-10위 전체순위 */}
        <div class="board">
          <h2>Leaderboard</h2>
          <ul>
            {this.state.ranks.map((info, index) => (
              <li key={index}>
                <div className="player-item">
                  <div className="player-item__photo">
                    <div className="ranking">{index + 1}</div>
                    {/* image? */}
                  </div>
                  <div class="player-item__info">
                    <h4>{ info.name }</h4>
                  </div>
                  <div class="player-item__points">
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

export default Ranking