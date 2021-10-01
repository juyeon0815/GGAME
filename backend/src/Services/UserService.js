const axios = require('axios')
const qs=  require('qs');

const clientID = "fbb0739223a635262d2dcd957dd4c17c"
const clientSecret = "QlQkdjrX7emZCrJsTqqcVdPyxKO7iEPv"
const redirectUri = "http://localhost:3000/oauth/callback/kakao"

exports.getToken = async(code)=>{
    let token;
    try{
        token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:qs.stringify({//객체를 string 으로 변환
                grant_type: 'authorization_code',//특정 스트링
                client_id:clientID,
                client_secret:clientSecret,
                redirectUri:redirectUri,
                code: code,
            })
        })
    }catch(error){
        return error;
    }
    //토근은 client에
    // console.log('token :', token.data.access_token);
     
    let user;
    try{
        user = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token.data.access_token}`
            }
        })
    }catch(error){
        return error
    }
    console.log(user.data)
    return token.data.access_token;
    //유저 정보는 db에
    // return user.data
}