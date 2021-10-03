import React from "react";
import "./Mainpage.css";
import FlipCard from "react-flipcard";
import { MakeRoomModal, EnterRoomModal } from "./MainpageModal";
import { Link } from "react-router-dom";

class GameCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMR: false,
      showEnterGuest: false,
    };
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
              <div className="btn-play">
                <Link to="/pong" className="link-text btn-text-align">
                  <div>게임하기</div>
                </Link>
              </div>
            </div>
          </FlipCard>
        </div>
      );
    } else if (this.props.game === "snake") {
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
      );
    } else {
      return (
        <div>
          <FlipCard>
            <div className="flip-card-front">
              <img className="img-container" src={this.props.image} alt="game card"></img>
            </div>
            <div className="flip-card-back-drawing">
              <div className="btn-makeroom">
                <div className="btn-text-align" onClick={() => this.setState({ showMR: true })}>
                  방 만들기
                </div>
              </div>
              <div className="btn-enterroom">
                <div
                  className="btn-text-align"
                  onClick={() => this.setState({ showEnterGuest: true })}
                >
                  참가하기
                </div>
              </div>
            </div>
          </FlipCard>
          <MakeRoomModal
            isOpen={this.state.showMR}
            close={() => this.setState({ showMR: false })}
          />
          <EnterRoomModal
            isOpen={this.state.showEnterGuest}
            close={() => this.setState({ showEnterGuest: false })}
          />
        </div>
      );
    }
  }
}

export default GameCard;
