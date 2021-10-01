const UserService = require('../Services/UserService')

exports.getToken = async(req,res) =>{
    console.log(req.query.code);
    try{
        let result =await UserService.getToken(req.query.code)
        console.log("result :" ,result)
        return res.send(result);
    }catch(error){
        return error;
    }
}