import Kakao from '../assets/images/kakao_login.png'
import { kakao_auth_url } from './OAuth';
import Logo from '../assets/images/Logo.png'
import './Login.css'

const Login = () => {
  return (
    <div className="login-container">
      <div>
        <img src={Logo} alt='Logo' className="logo-style" />
        <a href={kakao_auth_url} className="kakao-style">
          <img src={Kakao} alt="login"></img>
        </a>
      </div>
    </div>
  )
}

export default Login
