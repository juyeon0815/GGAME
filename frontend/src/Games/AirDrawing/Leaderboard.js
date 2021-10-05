import React, { useEffect } from "react";
import "./Leaderboard.css";

function Leaderboard(props) {
  useEffect(() => {
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

        {props.score.map((client) => (
          <li key={client.socketId}>
            id : {client.nickname} score: {client.score}
          </li>
        ))}
      </aside>
    </div>
  );
}

export default Leaderboard;
