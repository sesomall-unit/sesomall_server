// console.log("$$server-start");
// const express = require('express');
// const config = require('./config/env');
// const loaders = require('./loaders');
// const responseMiddleware = require('./middlewares/responseMiddleware');
//
// //cookie-parser 설정
// const cookieParser = require('cookie-parser');
//
// // 데이터베이스 연결
// const { connectDB } = require('./config/db');
// connectDB();
//
// const app = express();
//
// // 서버 초기화 관련 로더 로드
// // loaders.expressLoader(app);
//
// // 기본적인 미들웨어 설정
// app.use(express.json());  // JSON 요청 본문을 파싱
// app.use(express.urlencoded({ extended: true }));  // URL-encoded 요청 본문을 파싱
// app.use(cookieParser());
//
// // 공통 응답 미들웨어
// app.use(responseMiddleware);
//
//
// // API 라우터 등록
// const apiRoutes = require('./api/v1/apiRoutes');  // 또는 ./api/v2/apiRoutes
// app.use('/api/v1', apiRoutes);  // API 버전 1 라우터를 등록
//
// // 기본 라우트
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// // 서버 시작: http 서버를 생성해주는 함수
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');

const app = express();

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 서버 시작: http 서버를 생성해주는 함수
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

