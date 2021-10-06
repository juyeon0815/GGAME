import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Mainpage.css";
import Pong from "../assets/images/pong.png";
import Snake from "../assets/images/snake.png";
import GameCard from "./MainpageCard";
import { faArrow, faMypage, faRanking, faLogout } from "../assets/icons/menu_icon";
import AirDrawing from "../assets/images/air_drawing.png";

const Mainpage = () => {
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
  }
  return (
    <div>
      {/* Menu Btn */}
      <div className={"menu-container"}>
        <div onClick={visiblityChange} className={"icon-arrow"}>
          {faArrow}
        </div>
        <Link to="/mypage" className={"icon-circle icon-mypage"}>
          {faMypage}
        </Link>
        <Link to="/ranking" className={"icon-circle icon-ranking"}>
          {faRanking}
        </Link>
        <Link to="/login" className={"icon-circle icon-logout"} onClick={() => sessionStorage.removeItem('token')}>
          {faLogout}
        </Link>
      </div>
      {/* Game Card */}
      <div className={"main-container"}>
        <GameCard image={Snake} game="snake" />
        <GameCard image={Pong} game="pong" />
        <GameCard image={AirDrawing} game="air-pong" />
      </div>
    </div>
  );
};

export default Mainpage;
