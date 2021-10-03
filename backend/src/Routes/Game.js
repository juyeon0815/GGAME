const express = require('express');
const router = express.Router();
const GameController = require('../Controllers/GameController')


router.get('/snake/rank', GameController.getRank)
router.post('/snake/rank',GameController.newRank)
router.get('/snake/new-achievement', GameController.newAchievement)

module.exports = router;