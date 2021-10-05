let clientList = {}; // numClients[roomId] = {a,b,c} 유저이름 목록
let problemList = ["문제1", "문제2", "문제3", "문제4", "문제5", "문제6", "문제7", "문제8"];

function isExistRoom(roomId) {
  return roomId in clientList;
}

function createRoom(roomId) {
  clientList[roomId] = {
    idx: 0,
    list: [],
    drawOrder: [],
    problem: problemList.sort(() => Math.random() - 0.5),
  };
}

function startGame(roomId) {
  let temp = clientList[roomId].list.slice();
  temp.sort(() => Math.random() - 0.5);
  temp.forEach((element) => {
    clientList[roomId].drawOrder.push(element);
  });
  clientList[roomId].problem = clientList[roomId].problem.slice(0, clientList[roomId].list.length);
}

function nextOrder(roomId) {
  clientList[roomId].idx++;
}

function addClient(roomId, s, n) {
  clientList[roomId].list.push({
    socketId: s,
    nickname: n,
    score: 0,
  });
}

function removeClient(roomId, socketId) {
  clientList[roomId].list.splice(clientList[roomId].list.indexOf(socketId), 1);
}

module.exports = {
  clientList,
  createRoom,
  addClient,
  removeClient,
  isExistRoom,
  startGame,
  nextOrder,
};
