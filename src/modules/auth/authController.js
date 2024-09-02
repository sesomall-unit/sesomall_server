const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../user/userModel');  // Sequelize User 모델

dotenv.config();

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
};

// 로그인 함수
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sequelize를 사용하여 사용자 조회
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        // 리프레시 토큰을 HTTP-Only 쿠키로 설정
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,  // 자바스크립트에서 접근 불가
            secure: process.env.NODE_ENV === 'production',  // HTTPS에서만 사용
            sameSite: 'Strict',  // CSRF 보호
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7일간 유효
        });

        // 액세스 토큰을 응답 본문으로 전달
        res.json({ accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }



};

// 액세스 토큰 갱신 함수
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies; // 쿠키에서 리프레시 토큰 가져오기

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh Token is required' });
    }

    try {
        const userPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findByPk(userPayload.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

        // 새로운 리프레시 토큰을 쿠키에 설정
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7일간 유효
        });

        res.json({ accessToken });
    } catch (error) {
        console.error('Error during token refresh:', error);
        return res.status(403).json({ message: 'Invalid Refresh Token' });
    }
};

module.exports = {
    login,
    refreshAccessToken,
};
