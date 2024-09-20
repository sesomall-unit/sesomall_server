const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('../user/userModel');  // Sequelize User 모델

dotenv.config();

// 회원가입 함수
const signup = async (req, res) => {
    const { email, password, userName, birthdate, phoneNumber, address } = req.body;

    try {
        // 이메일 중복 확인
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.error('이미 존재하는 이메일입니다.', 409);  // 공통 오류 응답 처리
        }

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(password, 10);  // bcrypt의 10 라운드 해싱

        // 새로운 사용자 생성
        const newUser = await User.create({
            email,
            password: hashedPassword,  // 해시된 비밀번호 저장
            userName,
            birthdate,
            phoneNumber,
            address,
        });

        // 회원가입 성공 응답
        return res.success({
            message: '회원가입이 완료되었습니다.',
            user: {
                id: newUser.id,
                email: newUser.email,
                userName: newUser.userName,
                birthdate: newUser.birthdate,
                phoneNumber: newUser.phoneNumber,
                address: newUser.address,
            }
        });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.error('Internal server error', 500);  // 공통 오류 응답 처리
    }
};

// 토큰
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
            return res.error('계정 정보가 존재하지 않습니다.', 401);  // 공통 오류 응답 처리
        }

        // 비밀번호 확인
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.error('비밀번호가 일치하지 않습니다.', 401);  // 공통 오류 응답 처리
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
        return res.success({ accessToken });  // 공통 성공 응답 처리
    } catch (error) {
        console.error('Error during login:', error);
        return res.error('Internal server error', 500);  // 공통 오류 응답 처리
    }
};

// 로그아웃 함수
const logout = (req, res) => {
    // 리프레시 토큰 쿠키 삭제
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
    });

    return res.success({ message: 'Logout successful' });  // 공통 성공 응답 처리
};

// 액세스 토큰 갱신 함수
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies; // 쿠키에서 리프레시 토큰 가져오기

    if (!refreshToken) {
        return res.error('Refresh Token is required', 401);  // 공통 오류 응답 처리
    }

    try {
        const userPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await User.findByPk(userPayload.id);

        if (!user) {
            return res.error('User not found', 404);  // 공통 오류 응답 처리
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

        // 새로운 리프레시 토큰을 쿠키에 설정
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7일간 유효
        });

        return res.success({ accessToken });  // 공통 성공 응답 처리

    } catch (error) {
        console.error('Error during token refresh:', error);
        return res.error('Invalid Refresh Token', 403);  // 공통 오류 응답 처리
    }
};

module.exports = {
    signup,
    login,
    refreshAccessToken,
    logout
};
