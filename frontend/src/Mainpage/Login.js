import Kakao from '../assets/images/kakao_login.png'
import { kakao_auth_url } from './OAuth';

const Login = () =>{

  return(
    <a href={kakao_auth_url}>
      <img src={Kakao} alt="login"></img>
    </a>
  )
}

export default Login
