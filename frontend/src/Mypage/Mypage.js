import React from 'react'
import './Mypage.css'
import TrophyList from './TrophyList'

const Mypage = () => {
  // get으로 업적 내역과 달성 여부 받아오기
  const trophySnake = {
    'snake_first': [true, '첫 게임'],
    'light_eating': [true, '소식'],
    'over_eating': [true, '과식'],
    'great_eater': [false, '대식가'],
    'apple_like': [false, '사과가 좋아'],
    'apple_love': [false, '사과가 너무 좋아'],
  }
  const trophyPong = {
    'pong_first': [true, '첫 게임'],
    'scd_round': [true, '2라운드에 진입한 자'],
    'trd_round': [false, '3라운드에 진입한 자'],
    'pong_master': [false, '핑퐁 마스터'],
    'pong_champ': [false, '핑퐁 챔피언'],
    'win_ai': [false, 'AI를 재패한 자'],
  }
  const trophyAirDrawing = {
    'first_victory': [false, '첫 우승'],
    'medal': [false, '시상식'],
    'telepathy': [false, '이심전심'],
    'mind_reader': [false, '독심술사'],
    'stupid': [true, '눈치없는 플레이어'],
    'very_stupid': [true, '정말 눈치없는 플레이어'],
  }
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