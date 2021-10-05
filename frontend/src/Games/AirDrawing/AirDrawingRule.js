import React from "react";
import Modal from "../../Common/Modal";
import v from "../../assets/images/v.png";
import up from "../../assets/images/up.png";

class PongRule extends React.Component {
  render() {
    const { isOpen, close } = this.props;
    return (
      <Modal isOpen={isOpen} close={close} footerBtn="submit">
        <h1>게임 방법</h1>
        <p>
          GGAME의 Ping Pong Game은 <img src={v} alt="v"></img>와 <img src={up} alt="up"></img>로
          Paddle을 위,아래로 움직일 수 있어요!
        </p>
        <p>
          라운드는 총3라운드로 구성되어 있으며 1/2라운드에서는 컴퓨터와 대결해서 해당 점수를 먼저
          얻으면 다음 라운드로 넘어갈 수 있어요!
        </p>
        <p>마지막 3라운드는 컴퓨터가 10점을 얻을 때까지 게임을 진행합니다.</p>
        <p>게임 오버 시 다른 사람들의 랭킹도 확인하고, 자신의 랭크도 등록할 수 있어요!</p>
        <p>다시 게임을 하고 싶다면 게임화면 클릭!</p>
      </Modal>
    );
  }
}
export { PongRule };
