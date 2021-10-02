const GameService = require("../Services/GameService")

exports.getRank =async(req,res)=>{
    console.log("뱀게임 1~10등 랭킹조회")
    try{
        await GameService.getRank().then((result)=>{
            res.send(result)
        })
    }catch(error){
        res.status(400).json({completed:false})
    }
}

exports.newRank = async(req,res)=>{
    console.log(req.body)
    try{
        await GameService.newRank(req.body.email, req.body.score).then((result)=>{
            console.log("result : ", result)
            res.status(200).json({completed: true})
        })
    }catch(error){
        res.status(400).json({completed:false})
    }
}