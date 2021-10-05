const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController')

// console.log("game===============");

router.get('/rank', GameController.getRank)
router.post('/rank',GameController.newRank)
router.get('/snake/new-achievement', GameController.newSnakeAchievement)
router.get('/pong/new-achievement', GameController.newPongAchievement)
router.get('/test', (req, res) => {
    res.send('send test')
})
router.post('/air-draw',GameController.airDrawGameResult)
router.get('/air-draw/new-achievement',GameController.newAirDrawAchievement)
module.exports = router;