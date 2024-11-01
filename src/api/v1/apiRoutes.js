const express = require("express");

// 검증 미들웨어
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdmin = require("../../middlewares/isAdmin"); // isAdmin 미들웨어 추가

const userRoutes = require("../../modules/user/userRoutes");
const productRoutes = require("../../modules/product/productRoutes");
const authRoutes = require("../../modules/auth/authRoutes");

// 관리자전용 모듈의 라우트
const adminUserRoutes = require("../../modules/admin/userManagement/adminUserRoutes");
const adminProductRoutes = require("../../modules/admin/productManagement/adminProductRoutes");

const router = express.Router();

// 인증 필요한 라우트
router.use("/user", authMiddleware, userRoutes);
router.use("/product", authMiddleware, productRoutes);

// 인증 필요없는 라우트
router.use("/auth", authRoutes);

// 관리자 라우트: 인증 + 관리자 권한 확인
router.use("/admin/users", authMiddleware, isAdmin, adminUserRoutes);
// router.use("/admin/products", authMiddleware, isAdmin, adminProductRoutes);

module.exports = router;
