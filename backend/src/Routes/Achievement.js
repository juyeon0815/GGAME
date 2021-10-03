const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.get('/snake', UserController.getSnakeAchievement)

module.exports = router;