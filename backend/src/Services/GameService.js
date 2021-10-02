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

