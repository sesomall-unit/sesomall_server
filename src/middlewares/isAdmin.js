// src/middleware/isAdmin.js
/**
 * 관리자 권한을 확인하는 미들웨어
 * @param {object} req - Express request 객체
 * @param {object} res - Express response 객체
 * @param {function} next - Express next 미들웨어 함수
 * @returns {function} next() 또는 403 에러 응답
 */
const isAdmin = (req, res, next) => {
  // req.user가 존재하고 role이 admin인지 확인
  if (req.user && req.user.role === "admin") {
    // 관리자인 경우 다음 미들웨어로 진행
    return next();
  } else {
    // 관리자가 아닌 경우 403 Forbidden 에러 반환
    return res.error("Access denied. Admins only.", 403);
  }
};

// 미들웨어 내보내기

module.exports = isAdmin;
