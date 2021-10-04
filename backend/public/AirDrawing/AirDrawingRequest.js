const URI = "/air-drawing";

exports.airDrawingRequest = function (app, pongStateModule) {
  app.get(URI + "/room-exist", (req, res) => {
    res.send(pongStateModule.isExistRoom(req.query.roomId));
  });

  // app.get("/sayHello", function (req, res) {
  //     res.send("hello world");
  // });

  // app.listen(5000, function () {
  //   console.log("Server Open");
  // });
};
