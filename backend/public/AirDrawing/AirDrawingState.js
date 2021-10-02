
let clientList = {}; // numClients[roomId] = {a,b,c} 유저이름 목록

function isExistRoom(roomId){
    return roomId in clientList;
}

function createRoom(roomId) {
    clientList[roomId] = [];
}

function addClient(roomId, s,n) {
    clientList[roomId].push({
        socketId: s,
        nickname: n
    });
}

function removeClient(roomId, socketId) {
    clientList[roomId].splice(clientList[roomId].indexOf(socketId), 1);
}

module.exports = {
    clientList,
    createRoom,
    addClient,
    removeClient,
    isExistRoom,
}