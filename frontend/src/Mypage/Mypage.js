import React from 'react'


class Mypage extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.location.state.user}의 Mypage</h1>
      </div>
    )
  }
}

export default Mypage