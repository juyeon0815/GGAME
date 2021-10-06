import React from "react";
import Modal from "../../Common/Modal";
import v from "../../assets/images/v.png";
import up from "../../assets/images/up.png";

class AirDrawingRule extends React.Component {
  render() {
    const { isOpen, close } = this.props;
    return (
      <Modal isOpen={isOpen} close={close} footerBtn="submit">
        <h1>게임 방법</h1>
        <p>GGAME의 Air Drawing Game은 👋으로 그림을 그릴 수 있어요!</p>
        <p>* 키보드 'd'를 누르고 있어야 그릴 수 있어요!</p>
        <p>* 캔버스를 클릭하고 'd' 를 눌러야 합니다.</p>
        <br></br>
        <p>한명씩 돌아가면서 그림을 그립니다.</p>
        <p>정답을 맞추면 다음 순서로 넘어갑니다.</p>
        <p>많은 정답을 맞춰 1등을 해보세요!</p>
      </Modal>
    );
  }
}
export { AirDrawingRule };
