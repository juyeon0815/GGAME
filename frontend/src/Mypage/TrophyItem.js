import React from 'react'
import './Mypage.css'
import icons from '../assets/icons/trophy_icons'

const TrophyItem = (props) => {
  return (
    <div className="trophy-card">
      <section>
        <main>
          {props.trophy[1][0] ? 
            <img src={icons[`${props.trophy[0]}`]} alt='icon' />
          : <img src={icons[`${props.trophy[0]}_bck`]} alt='icon' />
          }
        </main>
        <footer>
          <div>{props.trophy[1][1]}</div>
        </footer>
      </section>
    </div>
  )
}

export default TrophyItem