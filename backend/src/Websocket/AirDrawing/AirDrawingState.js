let clientList = {}; // numClients[roomId] = {a,b,c} 유저이름 목록
let problemList = [
  "집",
  "자동차",
  "태양",
  "꽃",
  "하트",
  "구름",
  "강아지",
  "기타",
  "사다리",
  "바나나",
  "나무",
  "수박",
  "고양이",
  "돼지",
  "가방",
  "핫도그",
  "거미",
  "연필",
  "우산",
  "손바닥",
  "넥타이",
  "장갑",
  "휴지",
  "의자",
  "책상",
  "비행기",
  "파인애플",
  "장갑",
  "카메라",
  "프라이팬",
  "신발",
  "변기",
  "사과",
  "포도",
  "선풍기",
  "선글라스",
  "칼",
  "하마",
  "가위",
  "침대",
  "칫솔",
  "옷걸이",
  "바지",
  "개구리",
  "치킨", 
  "피자",
  "시계",
  "마스크",
  "곰",
  "상어",
  "고래",
  "기린",
  "타조",
  "달력",
  "냉장고",

];

function isExistRoom(roomId) {
  return roomId in clientList;
}

function isExistNickname(name, roomId) {
  console.log(name, roomId);
  if (!(roomId in clientList)) return false;
  for (let i = 0; i < clientList[roomId].list.length; i++) {
    if (clientList[roomId].list[i].nickname === name) return false;
  }
  return true;
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
  isExistNickname,
};
