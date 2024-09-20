const express = require('express');
const { signup, login, logout, refreshAccessToken } = require('../auth/authController');

const router = express.Router();

router.post('/signup', signup);  // POST /api/v1/auth/signup 경로를 처리(회원가입)
router.post('/login', login); // POST /api/v1/auth/login 경로를 처리(로그인)
router.post('/logout', logout);  // POST /api/v1/auth/logout 경로를 처리(로그아웃)


// 다른 인증 관련 라우트
router.post('/refresh-token', refreshAccessToken);

module.exports = router;
