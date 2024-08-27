const express = require('express');
//morgan http 요청에 대한 로깅 미들웨어 서버에 들어오는 모든 요청에 대해 로그를 기록함
const morgan = require('morgan');
//cors오리진 설정
const cors = require('cors');

module.exports = (app) => {
    // 미들웨어 설정
    app.use(express.json());  // JSON 요청 본문 파싱
    app.use(express.urlencoded({ extended: true }));  // URL-encoded 요청 본문 파싱
    app.use(morgan('dev'));  // 요청 로깅 미들웨어
    app.use(cors());  // CORS 미들웨어 설정

    // 정적 파일 제공
    app.use(express.static('public'));  // public 폴더를 정적으로 제공

    // 라우트 등록
    const apiRoutes = require('../api/v1/apiRoutes');
    app.use('/api/v1', apiRoutes);

    // 기본 라우트 등록
    app.get('/', (req, res) => {
        res.send('Welcome to the API!');
    });

    console.log("Express loader initialized");
};
