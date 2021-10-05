import React, { useEffect } from "react";
import "./Leaderboard.css";

let idx = 1;

function Leaderboard(props) {
  useEffect(() => {
    idx = 1;
    console.log(props.score);
    return () => {};
  }, []);
  return (
    <div>
      <aside class="profile-card">
        <header>
          <h1>게임 결과</h1>

          <h2>우승자는 ?!?!</h2>
        </header>
        {props.score.slice(0, 10).map((client, index) => (
          <li className="item" key={client.socketId}>
            <span className="order">{index + 1} </span>
            {props.nickname === client.nickname ? (
              <span className="nickname">{client.nickname} (나)</span>
            ) : (
              <span className="nickname">{client.nickname} </span>
            )}
            <span className="score"> {client.score} 점 </span>
          </li>
        ))}
      </aside>
    </div>
  );
}

export default Leaderboard;
