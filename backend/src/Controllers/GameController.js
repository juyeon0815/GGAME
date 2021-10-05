const GameService = require("../Services/GameService")

exports.getRank =async(req,res)=>{
    console.log(req.query.type,"게임 1~10등 랭킹조회")
    try{
        await GameService.getRank(req.query.type).then((result)=>{
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newRank = async(req,res)=>{
    console.log(req.body)
    try{
        await GameService.newRank(req.body.type,req.body.email, req.body.score).then((result)=>{
            console.log("result : ", result)
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newSnakeAchievement = async(req,res)=>{
    console.log(req.query.email)
    try{
        await GameService.newSnakeAchievement(req.query.email).then((result)=>{
            console.log("result : ",result)
            res.status(200).json({data:result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newPongAchievement = async(req,res)=>{
    console.log(req.query.email)
    try{
        await GameService.newPongAchievement(req.query.email).then((result)=>{
            console.log("result : ",result)
            res.status(200).json({data:result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}