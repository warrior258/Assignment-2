const express = require('express');
const router = express.Router();

const { getUserInfo, saveUserInfo } = require('../controllers/User');

router.get('/', getUserInfo);
router.post('/', saveUserInfo);

module.exports = router;