import Kakao from '../assets/images/kakao_login.png'
import { kakao_auth_url } from './OAuth';
import Logo from '../assets/images/Logo.png'
import './Login.css'
import axios from 'axios';

const Login = () => {
  const userMe = () => {
    let token = sessionStorage.getItem('token')
    alert("클릭")
    axios.get("https://j5a104.p.ssafy.io/user/me",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result)=>{
      console.log(result)
    })
  }
  return (
    <div className="login-container">
      <div>
        <img src={Logo} alt='Logo' className="logo-style" />
        <a href={kakao_auth_url} className="kakao-style">
          <img src={Kakao} alt="login"></img>
        </a>
        <button onClick={userMe}>회원정보</button>
      </div>
    </div>
  )
}
export default Login
