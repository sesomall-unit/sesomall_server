const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Authorization 헤더가 없거나 Bearer 토큰이 없으면 접근 거부
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // 요청 객체에 디코딩된 사용자 정보 추가
        next();  // 다음 미들웨어 또는 라우트로 진행
    } catch (error) {
        console.error('Invalid token:', error.message);
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;
