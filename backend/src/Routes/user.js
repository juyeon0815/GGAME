const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController')

router.get('/auth/requestKakaoToken', UserController.getToken)
router.get('/me',UserController.userMe)


module.exports = router;