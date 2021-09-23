import React from 'react'
import './Mainpage.css'
import Pong from '../assets/images/pong.png'
import Snake from '../assets/images/snake.png'
import GameCard from './MainpageCard'

class Mainpage extends React.Component {
  render() {
    return (
      <div className={"container"}>
        <GameCard image={Snake} game="snake"/>
        <GameCard image={Pong} game="pong" />
      </div>
    )
  }
}

export default Mainpage