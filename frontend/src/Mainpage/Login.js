import Kakao from '../assets/images/kakao_login.png'
import { kakao_auth_url } from './OAuth';

import axios from 'axios';

const Login = () =>{

  function userMe(){
    let token = sessionStorage.getItem('token')

    alert("클릭")
    axios.get("http://localhost:5000/user/me",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((result)=>{
      console.log(result)
    })
  }

  return(
    <div>
      <a href={kakao_auth_url}>
      <img src={Kakao} alt="login"></img>
      </a>
      <button onClick={userMe}>회원정보</button>
    </div>
  )
}

export default Login
