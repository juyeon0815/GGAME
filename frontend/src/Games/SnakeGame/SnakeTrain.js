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
          className="btn-snake"
          onMouseDown={() => this.props.handleMouseDown(this.props.num)}
          onMouseUp={() => this.props.handleMouseUp()}
        >{DIRECTIONS[this.props.num]}
        </button>
        <span className="snake-infotext">{this.props.infoText}</span>
      </div>
    )
  }
}

export default SnakeTrain