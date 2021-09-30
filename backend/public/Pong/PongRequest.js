const URI = "/pong"

exports.request_pong = function (app,pongStateModule) {
    app.get(URI+"/room-exist",(req, res)=>{
        console.log(req.query.roomId);
        res.send(pongStateModule.isExistRoom(req.query.roomId));
    })

    // app.get("/sayHello", function (req, res) {
    //     res.send("hello world");
    // });
    
    // app.listen(5000, function () {
    //     console.log("Server Open");
    // });   
}

