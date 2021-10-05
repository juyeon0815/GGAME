const GameService = require("../Services/GameService")

exports.getSnakeRank =async(req,res)=>{
    console.log("뱀게임 1~10등 랭킹조회")
    try{
        await GameService.getSnakeRank().then((result)=>{
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newSnakeRank = async(req,res)=>{
    console.log(req.body)
    try{
        await GameService.newSnakeRank(req.body.email, req.body.score).then((result)=>{
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
        await GameService.newAchievement(req.query.email).then((result)=>{
            console.log("result : ",result)
            res.status(200).json({data:result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.getPongRank = async(req,res)=>{
    console.log("핑퐁게임 1~10등 랭킹조회");
    try{
        await GameService.getPongRank().then((result)=>{
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.newPongRank = async(req,res)=>{
    console.log(req.body)
    try{
        await GameService.newPongRank(req.body.email, req.body.score).then((result)=>{
            console.log("result : ", result)
            res.status(200).json({data: result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}