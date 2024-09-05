const express = require('express');

//검증 미들웨어
const authMiddleware = require('../../middlewares/authMiddleware')

const userRoutes = require('../../modules/user/userRoutes');
const authRoutes = require('../../modules/auth/authRoutes')

const router = express.Router();

//인증 필요한 라우트
router.use('/user', authMiddleware, userRoutes);

//인증 필요없는 라우트
router.use('/auth', authRoutes)

module.exports = router;
