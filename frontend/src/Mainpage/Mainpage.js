import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Mainpage.css'
import Pong from '../assets/images/pong.png'
import Snake from '../assets/images/snake.png'
import GameCard from './MainpageCard'
import { faArrow, faMypage, faRanking } from '../assets/icons/menu_icon'
 
const Mainpage = () => {
  const user = 'user'
  const [isMenu, setIsMenu] = useState(false)
  const visiblityChange = () => {
    const icons = document.querySelectorAll('.icon-circle')
    if (isMenu) {
      setIsMenu(false)
      icons.forEach(icon => {
        icon.style.visibility = "hidden"
        icon.classList.toggle('menu-open')
      })  
    }
    else {
      setIsMenu(true)
      icons.forEach(icon => {
        icon.style.visibility = "visible"
        icon.classList.toggle('menu-open')
      })  
    }
  }
  return (
    <div>
      <div className={"menu-container"}>
        <div onClick={visiblityChange} className={"icon-arrow"}>{faArrow}</div>
        <Link
          to={{
            pathname: `/mypage/${user}`,
            state: { user: user },
          }}
          className={"icon-circle icon-mypage"}
        >
          {faMypage}
        </Link>
        <Link to="/ranking" className={"icon-circle icon-ranking"}>{faRanking}</Link>
      </div>
      <div className={"main-container"}>
        <GameCard image={Snake} game="snake"/>
        <GameCard image={Pong} game="pong" />
      </div>
    </div>
  )
}

export default Mainpage