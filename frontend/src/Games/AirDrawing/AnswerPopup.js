import React, { useEffect } from "react";
import "./AnswerPopup.css";

let popup;
function AnswerPopup(props) {
  useEffect(() => {
    popup = document.getElementById("popup-wrapper");
  }, []);

  useEffect(() => {
    if (props.openPopup) {
      popup.classList.add("show");
    } else {
      popup.classList.remove("show");
    }
  }, [props.openPopup]);
  return (
    <div>
      {!props.endModal ? (
        <div id="popup-wrapper" class="popup-container">
          <div class="popup-content">
            <p>{props.user}님 정답입니다!</p>
            정답 : {props.ans}
          </div>
        </div>
      ) : (
        <div id="popup-wrapper" class="popup-container">
          <div class="popup-content">잠시후 게임이 종료됩니다.</div>
        </div>
      )}
    </div>
  );
}

export default AnswerPopup;
