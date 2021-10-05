const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController')


router.get('/rank', GameController.getRank)
router.post('/rank',GameController.newRank)
router.get('/snake/new-achievement', GameController.newSnakeAchievement)
router.get('/pong/new-achievement', GameController.newPongAchievement)
router.post('/air-draw',GameController.airDrawGameResult)
router.get('/air-draw/new-achievement',GameController.newAirDrawAchievement)
module.exports = router;