import React from 'react'

class SnakeTrain extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const DIRECTIONS = ['위', '아래', '왼쪽', '오른쪽']
    return (
      <div>
        <button 
          onMouseDown={() => this.props.handleMouseDown(this.props.num)}
          onMouseUp={() => this.props.handleMouseUp()}
        >{DIRECTIONS[this.props.num]}
        </button>
        <span>{this.props.infoText}</span>
      </div>
    )
  }
}

export default SnakeTrain