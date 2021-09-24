import React from "react"
import './Mainpage.css'
import FlipCard from 'react-flipcard'
import { CreateRoom } from '../Games/Pong/PongCreateRoom'
import { GuestEnterCode } from "../Games/Pong/PongGuestEnterCode"
import { Link } from 'react-router-dom'


let code;
class GameCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMR: false,
      showMR2: false,
      showEnterHost: false,
      showEnterGuest: false,
    }
  }

  createRoom = ()=>{
    this.setState({showMR: true})
    code = Math.floor(Math.random()*(10000-1000)+1000)
    console.log(code)
  }

  gameStart = ()=>{
    alert("눌러따!")
  }
  
  enterRoom = () =>{
    this.setState({showMR2: true})
  }
  
  render() {
    if (this.props.game === "pong") {
      return (
        <div>
          <FlipCard>
            {/* front */}
            <div className="flip-card-front">
              <img className="img-container" src={this.props.image} alt="game card"></img>
            </div>
            {/* back */}
            <div className="flip-card-back-pong">
              <div className="btn-makeroom">
                <div className="btn-text-align" onClick={this.createRoom}>방 만들기</div>
              </div>
              <div className="btn-enterroom">
                <div className="btn-text-align" onClick={this.enterRoom}>참가하기</div>
              </div>
            </div>
          </FlipCard>
          <CreateRoom
            code = {code}
            enter ={this.gameStart}
            isOpen={this.state.showMR}
            close={() => this.setState({showMR: false})}
          />
          <GuestEnterCode
            isOpen={this.state.showMR2}
            close={() => this.setState({showMR2: false})}
          />
        </div>
      )
    }
    else {
      return (
        <div>
          <FlipCard>
            {/* front */}
            <div className="flip-card-front">
              <img className="img-container" src={this.props.image} alt="game card"></img>
            </div>
            {/* back */}
            <div className="flip-card-back-snake">
              <div className="btn-play">
                <Link to="/snake" className="link-text btn-text-align">
                  <div>게임하기</div>
                </Link>
              </div>
            </div>
          </FlipCard>
        </div>
      )
    }
  }
}

export default GameCard