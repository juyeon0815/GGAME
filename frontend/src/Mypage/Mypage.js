import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './Mypage.css'
import TrophyList from './TrophyList'
import { getAchievement } from '../api'
import { faArrow, faMain, faRanking, faLogout } from "../assets/icons/menu_icon";

const initTrophySnake = {
  'snake_first': [false, '첫 게임'],
  'light_eating': [false, '소식'],
  'over_eating': [false, '과식'],
  'great_eater': [false, '대식가'],
  'apple_like': [false, '사과가 좋아'],
  'apple_love': [false, '사과가 너무 좋아'],
}
const initTrophyPong = {
  'pong_first': [false, '첫 게임'],
  'scd_round': [false, '2라운드에 진입한 자'],
  'trd_round': [false, '3라운드에 진입한 자'],
  'pong_master': [false, '핑퐁 마스터'],
  'pong_champ': [false, '핑퐁 챔피언'],
  'win_ai': [false, 'AI를 재패한 자'],
}
const initTrophyAirDrawing = {
  'first_victory': [false, '첫 우승'],
  'medal': [false, '시상식'],
  'telepathy': [false, '이심전심'],
  'mind_reader': [false, '독심술사'],
  'stupid': [false, '눈치없는 플레이어'],
  'very_stupid': [false, '정말 눈치없는 플레이어'],
}

const Mypage = () => {
  // get으로 업적 내역과 달성 여부 받아오기
  const [achievement, setAchievement] = useState([])
  let trophySnake = Object.assign({}, initTrophySnake)
  let trophyPong = Object.assign({}, initTrophyPong)
  let trophyAirDrawing = Object.assign({}, initTrophyAirDrawing)

  useEffect(() => {
    // res.data.data
    getAchievement().then((res) => {
      // let tmp = ['medal', 'pong_first', 'snake_first', 'mind_reader', 'very_stupid']
      // setAchievement(tmp)
      setAchievement(res.data.data)
    })
  }, [])
  for (let item of achievement) {
    for (let name in trophySnake) {
      if (name === item) trophySnake[name][0] = true
    }
    for (let name in trophyPong) {
      if (name === item) trophyPong[name][0] = true
    }
    for (let name in trophyAirDrawing) {
      if (name === item) trophyAirDrawing[name][0] = true
    }
  }
  const [isMenu, setIsMenu] = useState(false);
  const visiblityChange = () => {
    const icons = document.querySelectorAll(".icon-circle");
    if (isMenu) {
      setIsMenu(false);
      icons.forEach((icon) => {
        icon.style.visibility = "hidden";
        icon.classList.toggle("menu-open");
      });
    } else {
      setIsMenu(true);
      icons.forEach((icon) => {
        icon.style.visibility = "visible";
        icon.classList.toggle("menu-open");
      });
    }
  };

  const styleH1 = {
    margin: '5vh 3vh 0 3vh',
  }
  return (
    <div>
      {/* Menu Btn */}
      <div className={"menu-container"}>
        <div onClick={visiblityChange} className={"icon-arrow"}>
          {faArrow}
        </div>
        <Link to="/" className={"icon-circle icon-main"}>
          {faMain}
        </Link>
        <Link to="/ranking" className={"icon-circle icon-ranking"}>
          {faRanking}
        </Link>
        <Link to="/login" className={"icon-circle icon-logout"} onClick={() => sessionStorage.removeItem('token')}>
          {faLogout}
        </Link>
      </div>
      <h1 style={styleH1}>업적 관리</h1>
      <div className="my-container">
        <TrophyList gameName="뱀과 사과" trophyList={trophySnake} />
        <TrophyList gameName="퐁" trophyList={trophyPong} />
        <TrophyList gameName="에어드로잉" trophyList={trophyAirDrawing} />
      </div>
    </div>
  )
}

export default Mypage