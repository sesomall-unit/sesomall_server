// Express 라우터를 사용하여 컨트롤러와 URL 경로를 연결하는 역할

const express = require('express');
const userController = require('./userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
// router.get('/:id', userController.getUserById);

module.exports = router;
