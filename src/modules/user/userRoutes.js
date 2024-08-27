const express = require('express');
const userController = require('./userController');

const router = express.Router();

// /api/v1/user 엔드포인트에서 GET 요청이 들어오면 userController의 getUsers 함수 호출
router.get('/', userController.getUsers);

module.exports = router;
