// src/modules/admin/userManagement/routes/adminUserRoutes.js
const express = require("express"); // Express 프레임워크 불러오기
const router = express.Router(); // Express 라우터 생성
const adminUserController = require("../userManagement/adminUserController"); // 관리자용 사용자 컨트롤러 불러오기

// 사용자 관리 라우트 정의
router.post("/", adminUserController.createUser); // 새로운 사용자 생성
router.get("/", adminUserController.getAllUsers); // 모든 사용자 목록 조회
router.put("/:id", adminUserController.updateUser); // 특정 사용자 정보 수정
router.delete("/:id", adminUserController.deleteUser); // 특정 사용자 삭제

module.exports = router; // 라우터 모듈 내보내기
