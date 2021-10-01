import {useEffect } from "react";
import axios from "axios";

const LoginRedirect = () => {
    useEffect(()=>{
        let code = new URL(window.location.href).searchParams.get("code");
        console.log("code :", code);
        axios.get("http://localhost:5000/user/auth/requestKakaoToken", {params:{code : code}})
        .then((res)=>{
            console.log("msg", res);
        }).catch((error)=>{
            console.log("error :", error);
        })
      })

      return(
          <div></div>
      )
}

export default LoginRedirect