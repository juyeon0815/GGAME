import {useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom'

const LoginRedirect = () => {
    let history = useHistory()

    useEffect(()=>{
        let code = new URL(window.location.href).searchParams.get("code");
        console.log("code :", code);
        axios.get("https://j5a104.p.ssafy.io/user/auth/requestKakaoToken", {params:{code : code}})
        .then((res)=>{
            console.log("msg", res.data);
            sessionStorage.setItem("token", res.data);
            history.push("/");
        }).catch((error)=>{
            console.log("error :", error);
        })
      })

      return(
          <div></div>
      )
}

export default LoginRedirect