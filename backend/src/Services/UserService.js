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
            conn.query(sql,params,function(error,result){
                if(error) console.log(error)
                else console.log(result)
            })
        }else console.log("이미회원가입되어있어서 로그인만~")
        conn.end()
    })
    return token.data.access_token;
    
}

exports.getSnakeAchievement=(email)=>{
    return new Promise((resolve, reject)=>{
        let achievement = []
        let sql ="select id from user where email=?"
        let params =[email]
        conn.query(sql,params,function(error, result){
            if(error) return reject(error);
            else{
                let user_id = result[0].id;
                sql = "select standard.name from standard join achievement on achievement.standard_id = standard.id where achievement.user_id =?"
                params = [user_id];
                conn.query(sql,params,function(error, res){
                    if(error) return reject(error);
                    else {
                        for(let i=0; i<res.length;i++) achievement.push(res[i].name)
                        return resolve(achievement);
                    }
                })
            }
        })
    })
}

exports.userMe = async(token) =>{
    let user;
    try{
        user = await axios({
            method:'get',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
    }catch(error){
        return error
    }

    const user_id = user.data.id;
    return new Promise((resolve, reject)=>{
        let sql = "select * from user where user_id=?"
        let params = [user_id]
        conn.query(sql,params,function(error, result){
            if(error) return reject(error)
            else return resolve(result)
        })
    })
}