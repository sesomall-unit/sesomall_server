const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Authorization 헤더가 없거나 Bearer 토큰이 없으면 접근 거부
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.error('Access denied. No token provided.', 401);  // 공통 오류 응답 사용
    }

    const token = authHeader.split(' ')[1];

    try {
        // 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // 요청 객체에 디코딩된 사용자 정보 추가
        next();  // 다음 미들웨어 또는 라우트로 진행
    } catch (error) {
        console.error('Invalid token:', error.message);
        res.error('Invalid token.', 403);  // 공통 오류 응답 사용
    }
};

module.exports = authMiddleware;
