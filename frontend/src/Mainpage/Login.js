import Kakao from "../assets/images/kakao_login.png";
import { kakao_auth_url } from "./OAuth";
import Logo from "../assets/images/Logo.png";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { UserMeApi } from "../api";

const Login = () => {
  // 로그인 성공 시 메인 페이지로 이동
  let history = useHistory();
  useEffect(() => {
    UserMeApi();
    if (sessionStorage.getItem("token")) {
      console.log("hi");
      history.push({ pathname: "/" });
    }
  }, []);

  const userMe = () => {
    let token = sessionStorage.getItem("token");
    alert("클릭");
    axios
      .get("https://j5a104.p.ssafy.io/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      });
  };
  return (
    <div className="login-container">
      <div>
        <div className="ggame-logo">깸</div>
        <div className="ggame-logo-sub">어색한 분위기를 깨자 !</div>
        <a href={kakao_auth_url} className="kakao-style">
          <img src={Kakao} alt="login"></img>
        </a>
        <p className="text-align">전체 동의를 눌러주세요!</p>
      </div>
    </div>
  );
};
export default Login;
