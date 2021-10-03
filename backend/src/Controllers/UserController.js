const UserService = require('../Services/UserService')

exports.getToken = async(req,res) =>{
    console.log(req.query.code);
    try{
        let result =await UserService.getToken(req.query.code)
        console.log("result :" ,result)
        return res.send(result);
    }catch(error){
        res.status(400).json({data:error})
    }
}

exports.getSnakeAchievement = async(req,res)=>{
    console.log(req.query.email)
    try{
        await UserService.getSnakeAchievement(req.query.email).then((result)=>{
            console.log(result)
            res.status(200).json({data:result})
        })
    }catch(error){
        res.status(400).json({data:error})
    }
}