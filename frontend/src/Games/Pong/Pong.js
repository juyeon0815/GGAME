import React, { useEffect, useState, useRef } from "react";
import PongGameView from './PongGameView';

const Pong = () => {
  return(
    <div>
      <h1>PingPong</h1>
        <div>
        <p id="game_menu"></p>
        <PongGameView />
        </div>
    </div>
  )
};

export default Pong;
