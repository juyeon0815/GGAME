import React from "react"
import  Modal from '../../Common/Modal'

class SnakeRule extends React.Component {
  render() {
    const {isOpen, close} = this.props
    return (
      <Modal isOpen={isOpen} close={close} footerBtn="submit">
        <h1>게임 방법</h1>
        <p>1. 해당 위치를 클릭해서 상하좌우 버튼을 나만의 모션으로 등록하세요 ! 여러번 등록 시 인식률 증가합니다 ~!</p>
        <p>2. 사과를 가장 많이 먹은 사람이 1위 !  뱀의 머리가 경계, 자신의 몸에 부딪치면 게임 오버</p>
      </Modal> 
    )
  }
}
export {
  SnakeRule,
}