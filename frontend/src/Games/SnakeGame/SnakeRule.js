import React from "react"
import Modal from '../../Common/Modal'

class SnakeRule extends React.Component {
  render() {
    const {isOpen, close} = this.props
    return (
      <Modal isOpen={isOpen} close={close} footerBtn="submit">
        <h1>게임 방법</h1>
        <p>GGAME의 Snake Game에서는 상하좌우 버튼을 나만의 모션으로 등록하여 사용해요!</p>
        <p>위, 아래, 왼쪽, 오른쪽 버튼을 클릭하여 해당 모션을 등록하세요.</p>
        <p>여러번 등록할수록 인식률이 업업! 원활한 플레이를 위해 많은 학습을 해주세요~</p>
        <p>등록된 모션은 캡쳐 화면으로 확인할 수 있어요.</p>
        <p>사과를 많이 먹을수록 점수가 올라갑니다.</p>
        <p>뱀의 머리가 자신의 몸이나 경계에 부딪히면 게임 오버이니 잘 피해주세요~</p>
        <p>게임 오버 시 다른 사람들의 랭킹도 확인하고, 자신의 랭크도 등록할 수 있어요!</p>
      </Modal> 
    )
  }
}
export {
  SnakeRule,
}