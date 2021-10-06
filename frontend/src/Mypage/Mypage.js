import React, { useState, useEffect } from 'react'
import './Mypage.css'
import TrophyList from './TrophyList'
import { getAchievement } from '../api'

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
      console.log(res)
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
  
  // const trophySnake = achievement === [] ? achievement.map((item) => {
  //   let res = Object.assign({}, initTrophySnake)
  //   res[item][0] = true
  //   console.log(res)
  //   return res
  // }) : Object.assign({}, initTrophySnake)

  const styleH1 = {
    margin: '5vh 3vh 0 3vh',
  }
  return (
    <div>
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