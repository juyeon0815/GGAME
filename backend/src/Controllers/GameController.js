const GameService = require("../Services/GameService")

exports.getRank =async(req,res)=>{
    console.log("뱀게임 1~10등 랭킹조회")
    try{
        await GameService.getRank().then((result)=>{
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newRank = async(req,res)=>{
    console.log(req.body)
    try{
        await GameService.newRank(req.body.email, req.body.score).then((result)=>{
            console.log("result : ", result)
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newAchievement = async(req,res)=>{
    console.log(req.query.email)
    try{
        await GameService.newAchievement(req.query.email).then((result)=>{
            console.log("result : ",result)
            res.status(200).json({data:result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}