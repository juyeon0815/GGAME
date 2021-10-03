import React from 'react'
import './Mypage.css'
import SingleReport from './SingleReport'

const Mypage = () => {
  return (
    <div className="my-container">
      <div className="btn-region">
        <button className="mypage-btn">사과와 뱀</button>
        <button className="mypage-btn">탁구</button>
        <button className="mypage-btn">캐치마인드(?)</button>
      </div>
      <SingleReport />
    </div>
  )
}

export default Mypage