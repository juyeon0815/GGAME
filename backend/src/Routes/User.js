const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.get('/auth/requestKakaoToken', UserController.getToken)
router.get('/me',UserController.userMe)
router.get('/achievement', UserController.getAchievement)
router.get('/test', (req, res) => {
    res.send('send test')
})

module.exports = router;
