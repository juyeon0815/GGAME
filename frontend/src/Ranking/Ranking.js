import React from 'react'
import axios from 'axios'
import GameRanking from './GameRanking'
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      snake_ranks: [],
      snake_top3: [],
      pong_ranks: [],
      pong_top3: [{'name': 'player6', 'score': '20'}, {'name': 'player5', 'score': '30'}, {'name': 'player7', 'score': '10'}],
    }
  }

  componentDidMount() {
    // axios
    axios.get('http://localhost:5000/game/snake/rank')
    .then((Response)=>{
      this.setState({ snake_ranks: Response.data.data})
      let top3 = []
      for (let i = 0; i < (this.state.snake_ranks.length < 3 ? this.state.snake_ranks.length : 3); i++) {
        top3.push(this.state.snake_ranks[i])
      }
      this.setState({ snake_top3: top3})
    }).catch((Error)=>{
        console.log(Error);
    })
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