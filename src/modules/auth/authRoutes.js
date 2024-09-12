const express = require('express');
const { login, logout, refreshAccessToken } = require('../auth/authController');

const router = express.Router();

router.post('/login', login); // POST /api/v1/auth/login 경로를 처리
router.post('/logout', logout);  // POST /api/v1/auth/logout 경로를 처리


// 다른 인증 관련 라우트
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
