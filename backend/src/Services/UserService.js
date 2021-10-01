const axios = require('axios')
const qs=  require('qs');

const ggame = require('../Database/ggame')
const conn = ggame.init();

ggame.connect(conn);

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

    const name =user.data.kakao_account.profile.nickname
    const email =  user.data.kakao_account.email
    const userId = user.data.id


    let sql = "select * from user where email=?"
    let params = [email];
    conn.query(sql,params,function(error,result){
        if(result.length===0){
            sql = "INSERT INTO user(name, email, user_id) VALUES(?,?,?)";
            params = [name,email,userId];
        }
    })
    return token.data.access_token;
    
}