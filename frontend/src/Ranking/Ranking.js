import React from 'react'
import axios from 'axios'
import GameRanking from './GameRanking'
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snake_ranks: [],
      snake_top3: [{'name': 'player2', 'score': '20'}, {'name': 'player1', 'score': '30'}, {'name': 'player3', 'score': '10'}],
      pong_ranks: [],
      pong_top3: [{'name': 'player6', 'score': '20'}, {'name': 'player5', 'score': '30'}, {'name': 'player7', 'score': '10'}],
    }
  }

  componentDidMount() {
    // axios
    this.setState({ snake_ranks: [{'name': 'player1', 'score': '30'}, {'name': 'player2', 'score': '20'}, {'name': 'player3', 'score': '10'}, {'name': 'player4', 'score': '5'}]})
    this.setState({ pong_ranks: [{'name': 'player5', 'score': '30'}, {'name': 'player6', 'score': '20'}, {'name': 'player7', 'score': '10'}, {'name': 'player8', 'score': '5'}]})
  }

  render() {
    return (
      <div className="rankings">
        <GameRanking 
          game="Snake"
          ranks={this.state.snake_ranks}
          top3={this.state.snake_top3}
        />
        <GameRanking 
          game="PingPong"
          ranks={this.state.pong_ranks}
          top3={this.state.pong_top3}
        />
      </div>
    )
  }
}

export default Ranking