const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController')


router.get('/snake/rank', GameController.getSnakeRank)
router.post('/snake/rank',GameController.newSnakeRank)
router.get('/snake/new-achievement', GameController.newSnakeAchievement)
router.get('/pong/rank',GameController.getPongRank)
router.post('/pong/rank',GameController.newPongRank)

module.exports = router;