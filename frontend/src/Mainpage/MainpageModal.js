import React, { useState, useRef } from "react";
import "./Mainpage.css";
import NestedModal from "./MainpageNestedModal";
import Modal from "../Common/Modal";
import { useHistory } from "react-router-dom";
import axios from "axios";

const MakeRoomModal = (props) => {
  const [showEnterHost, setShowEnterHost] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [nickName, setNickName] = useState("");

  let history = useHistory();
  const enterCode = useRef();

  const create = () => {
    const newRoom = document.querySelector("#new_room").value;
    const newNickname = document.querySelector("#new_nickname").value;
    if (newRoom === "" || newNickname === "") {
      alert("방 이름과 닉네임은 필수 입력 사항입니다.");
    } else {
      // 서버에 소켓 넘버 요청
      console.log("방 이름 : ", newRoom);
      console.log("닉네임 : ", newNickname);
      setRoomNumber(parseInt(Math.floor(Math.random() * (10000 - 1000) + 1000)));
      setNickName(newNickname);
      setShowEnterHost(true);
    }
  };
  const isShowEnterHost = () => {
    setShowEnterHost(false);
  };
  const enterHost = () => {
    isShowEnterHost();
    history.push({
      pathname: "/air-drawing/host",
      newRoom: roomNumber,
      newNickName: nickName,
    });
  };

  const { isOpen, close } = props;
  if (!showEnterHost) {
    return (
      <NestedModal
        isOpen={isOpen}
        close={close}
        footerBtn={create}
        isShowEnter={isShowEnterHost}
        footerBtnName="create"
      >
        <h1>방 만들기</h1>
        <div>
          <label htmlFor="new_room" className="modal-label">
            방 이름
          </label>
          <input
            type="text"
            id="new_room"
            placeholder="방 이름을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label htmlFor="new_nickname" className="modal-label">
            닉네임
          </label>
          <input
            type="text"
            id="new_nickname"
            placeholder="사용할 닉네임을 입력하세요"
            className="modal-input"
          />
        </div>
      </NestedModal>
    );
  } else {
    const style = {
      marginRight: "10px",
      width: "90%",
    };
    return (
      <NestedModal
        isOpen={isOpen}
        close={close}
        footerBtn={enterHost}
        isShowEnter={isShowEnterHost}
        footerBtnName="enter"
      >
        <div>
          <h2>입장 코드</h2>
          <input
            type="text"
            id="enter_room_host"
            className="modal-input"
            value={roomNumber}
            ref={enterCode}
            style={style}
            disabled
          />
          <button onClick={() => navigator.clipboard.writeText(enterCode.current.value)}>
            복사
          </button>
        </div>
      </NestedModal>
    );
  }
};

const EnterRoomModal = (props) => {
  let history = useHistory();
  const enter = () => {
    // 서버에 소켓 넘버 맞는지 체크

    const enterRoom = document.querySelector("#enter_room_guest").value;

    axios
      .get("https://j5a104.p.ssafy.io/air-drawing/room-exist", {
        params: {
          roomId: parseInt(enterRoom),
        },
      })
      .then((res) => {
        console.log("roomExist", res.data);

        const newNickname = document.querySelector("#new_nickname").value;
        if (newNickname === "") alert("닉네임은 필수 입력 사항입니다.");
        else if (!res.data) alert("입장 코드가 잘못되었습니다.");
        else
          history.push({
            pathname: "/air-drawing/guest",
            roomId: parseInt(enterRoom),
            newNickName: newNickname,
          });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const { isOpen, close } = props;
  return (
    <Modal isOpen={isOpen} close={close} footerBtn={enter} footerBtnName="enter">
      <div>
        <h1>참가하기</h1>
        <div>
          <label htmlFor="new_nickname" className="modal-label">
            닉네임
          </label>
          <input
            type="text"
            id="new_nickname"
            placeholder="사용할 닉네임을 입력하세요"
            className="modal-input"
          />
        </div>
        <div>
          <label htmlFor="enter_code" className="modal-label">
            입장 코드
          </label>
          <input
            type="text"
            id="enter_room_guest"
            placeholder="입장코드를 입력하세요"
            className="modal-input"
          />
        </div>
      </div>
    </Modal>
  );
};

export { MakeRoomModal, EnterRoomModal };
