const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; // access token
    const refreshToken = req.cookies.refreshToken;

    console.log("authHeader토큰", authHeader)
    // Authorization 헤더가 없거나 Bearer 토큰이 없으면 접근 거부
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.error('Access denied. No token provided.', 401);  // 공통 오류 응답 사용
    }

    const token = authHeader.split(' ')[1];

    console.log("token", token)

    try {
        // 리프레시 토큰 검증
        jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (error, decoded) => {
            if (error) {
                // 에러가 발생하면, 에러 객체에 토큰 유형을 추가
                error.tokenType = 'refresh';
                throw error;
            }
        });
        // 액세스 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // 요청 객체에 디코딩된 사용자 정보 추가
        next();  // 다음 미들웨어 또는 라우트로 진행

    } catch (error) {
        console.error('Invalid token:', error.message);
        if (error instanceof jwt.TokenExpiredError) {
            if (error.message.includes('jwt expired')) {
                if(error.tokenType === "refresh"){
                    res.error('Invalid refresh token.', 401, 1003); //1003 : refresh token 만료
                }else {
                    res.error('Invalid access token.', 401, 1001); // 1001 : access token 만료
                }
            }
        }else{
         res.error('Invalid token.', 403);
        }
    }
};

module.exports = authMiddleware;
