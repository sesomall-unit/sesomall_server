// 모든 로더를 초기화하는 메인 파일

// loaders/index.js

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const responseMiddleware = require('../middlewares/responseMiddleware');
const { connectDB } = require('../config/db');
const apiRoutes = require('../api/v1/apiRoutes');

const expressLoader = (app) => {
    console.log("$$server-start2");

    // 미들웨어 설정
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:3000', // 프론트엔드 서버 주소
        credentials: true, // 쿠키를 첨부해서 보내는 요청 허용
    }));

    // 공통 응답 미들웨어
    app.use(responseMiddleware);

    // API 라우터 등록
    app.use('/api/v1', apiRoutes);

    // 기본 라우트
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
};

const initializeApp = async () => {
    const app = express();

    // 데이터베이스 연결
    await connectDB();

    // Express 앱 설정
    expressLoader(app);

    return app;
};

module.exports = { initializeApp };