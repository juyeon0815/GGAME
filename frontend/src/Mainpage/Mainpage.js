<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import Pong from "../assets/images/pong.png";
import Snake from "../assets/images/snake.png";
import AirDrawing from "../assets/images/air_drawing.png";
import GameCard from "./MainpageCard";
import { faArrow, faMypage, faRanking } from "../assets/icon";

=======
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Mainpage.css'
import Pong from '../assets/images/pong.png'
import Snake from '../assets/images/snake.png'
import GameCard from './MainpageCard'
import { faArrow, faMypage, faRanking } from '../assets/icons/menu_icon'
 
>>>>>>> 967eb210bc3089f4425b0afd2239cd158f401090
const Mainpage = () => {
  const user = "user";
  const [isMenu, setIsMenu] = useState(false);
  const visiblityChange = () => {
<<<<<<< HEAD
    const icons = document.querySelectorAll(".icon-circle");
=======
    const icons = document.querySelectorAll('.icon-circle')
>>>>>>> 967eb210bc3089f4425b0afd2239cd158f401090
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
  return (
    <div>
      <div className={"menu-container"}>
        <div onClick={visiblityChange} className={"icon-arrow"}>
          {faArrow}
        </div>
        <Link
          to={{
            pathname: `/mypage/${user}`,
            state: { user: user },
          }}
          className={"icon-circle icon-mypage"}
        >
          {faMypage}
        </Link>
        <Link to="/ranking" className={"icon-circle icon-ranking"}>
          {faRanking}
        </Link>
      </div>
<<<<<<< HEAD
      <div className={"container"}>
        <GameCard image={Snake} game="snake" />
=======
      <div className={"main-container"}>
        <GameCard image={Snake} game="snake"/>
>>>>>>> 967eb210bc3089f4425b0afd2239cd158f401090
        <GameCard image={Pong} game="pong" />
        <GameCard image={AirDrawing} game="air-pong" />
      </div>
    </div>
  );
};

export default Mainpage;
