const ggame = require('../Database/ggame');
const conn = ggame.init();

ggame.connect(conn);

exports.getRank =()=>{
    return new Promise((resolve, reject)=>{
        let sql = "select user.name, rank_snake.score from rank_snake join user on rank_snake.user_id = user.id order by score desc limit 10";
    conn.query(sql, function(error, result){
        return error? reject(error) : resolve(result)
    })
    })
}

exports.newRank =async(email, score) =>{

    return new Promise((resolve, reject)=>{
         //일단 rank 정보가 있는지 확인
        let params = [email];
        let sql = "select * from rank_snake join user on rank_snake.user_id = user.id where user.email =?"
        conn.query(sql,params,function(error, result){
            if(error) return reject(false);
            else{
                if(result.length===0){ //없으면 추가
                    let user_id;
                    sql = "select id from user where email =?";
                    conn.query(sql,params, function(error, res){
                        if(error) return reject(false);
                        else{
                            user_id = res[0].id;
                            sql = "insert into rank_snake(user_id, score, eating) values(?,?,?)";
                            params = [user_id, score, score];
                            conn.query(sql, params, function(error, re){
                                if(error) return reject(false);
                                else {
                                    console.log("rank_snake 추가 완료!")
                                    return resolve(true);
                                }
                            })
                        }
                    })
                }else{ //있으면 score 비교후 갱신할 지 결정 / eating+=score
                    let max = result[0].score;     
                    let rank_score = Math.max(max, score);
                    sql = "update rank_snake set score=?, eating=eating+? where user_id=?"
                    params= [rank_score,score,result[0].id]
                    conn.query(sql,params, function(error, r){
                        if(error) return reject(false);
                        else {
                            console.log("rank_snake 갱신완료!")
                            return resolve(true);
                        }
                    })
                }
        }
        })
    })
}

exports.newAchievement = async(email) =>{
    return new Promise((resolve, reject)=>{
        let achivement = [];
        let check = [1,2,3,4,5,6]
        let sql = "select id from user where email=?"
        let params = [email]
        conn.query(sql, params, function(error, result){ //email에 해당하는 rank_snake 정보 확인
            if(error) return reject(error);
            else{
                let user_id = result[0].id
                sql = "select standard_id from achievement where user_id=?"
                params = [user_id];
                conn.query(sql,params, function(error, res){
                    if(error) return reject(error);
                    else{
                        for(let i=0; i<res.length;i++){
                            let remove = check.indexOf(res[i].standard_id)
                            check.splice(remove,1);
                        }
                        let score, eating;
                        sql = "select * from rank_snake where user_id=?"
                        params = [user_id]
                        conn.query(sql,params,function(error, result){
                            if(error) return reject(error);
                            else{
                                let num =[]
                                score = result[0].score;
                                eating = result[0].eating;
                                for(let i=0; i<check.length;i++){
                                    let number = -1;
                                    let name;
                                    if(check[i]===1){ //첫게임
                                        number=1; name ="snake_first"
                                    }else if(check[i]===2 && score>=5){ //사과 먹은 개수 socre=5
                                        number=2; name="light_eating"
                                    }else if(check[i]===3 && score>=10){ //사과 먹은 개수 socre=10
                                        number=3; name="over_eating"
                                    }else if(check[i]===4 && score>=20){ //사과 먹은 개수 socre=20
                                        number=4; name="great_eater"
                                    }else if(check[i]===5 && eating>=50){ //누적 사과 수 eating=50
                                        number=5; name="apple_like"
                                    }else if(check[i]===6 && eating>=100){ //누적 사과 수 eating=100
                                        number=6; name="apple_love"
                                    }

                                    if(number!==-1){
                                       achivement.push(name)
                                       num.push(number)

                                    }
                                }
                                insert_achievement(num, user_id)
                                return resolve(achivement)
                            }
                        })
                    }      
                })       
            }
        })
    })
}

function insert_achievement(num, user_id){
    for(let i=0; i<num.length;i++){
        let sql = "insert into achievement(user_id, standard_id) values(?,?)"
        let params = [user_id, num[i]]
        conn.query(sql,params, function(error, result){
            if(error) console.log(error)
        })
    }
}


