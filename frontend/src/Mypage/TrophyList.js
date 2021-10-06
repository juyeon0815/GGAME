import React from 'react'
import './Mypage.css'
import TrophyItem from './TrophyItem'

const TrophyParsing = (props) => {
  const trophyItems = Object.entries(props.trophyList)
  const style = {
      marginTop: "30px",
  }
  const rendering = () => {
    const result = []
    for (let i = 0; i < trophyItems.length; i += 2) {
      if (i + 1 < trophyItems.length) {
        result.push(
          <div key={i} className="trophy-list">
            <TrophyItem trophy={trophyItems[i]} />
            <TrophyItem trophy={trophyItems[i+1]} />
          </div>
        )
      }
      else {
        result.push(
          <TrophyItem trophy={trophyItems[i]} />
        )
      }
    }
    return result
  }
  return <div style={style}>{rendering()}</div>
}

const TrophyList = (props) => {
  // const style = {
  //   padding: '1rem',
  //   fontSize: '1.8rem',
  //   fontWeight: 'bold',
  // }
  return (
    <div className="trophy-region">
      {/* <div style={style}>{props.gameName}</div> */}
      <TrophyParsing trophyList={props.trophyList} />
    </div>
  )
}

export default TrophyList