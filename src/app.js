console.log("$$server-start");
const express = require('express');
const { connectDB } = require('./config/db'); // DB 연결 모듈 임포트
const loaders = require('./loaders');

const startServer = async () => {
    try {
        // 데이터베이스 연결
        await connectDB();

        const app = express();

        // Express 애플리케이션 초기화 작업
        loaders.expressLoader(app);

        // 서버 시작
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();




// console.log("$$server-start");
// const express = require('express');
//
// const config = require('./config/env');
// const { connectDB } = require('./config/db');
//
// const loaders = require('./loaders');
//
// // 데이터베이스 연결
// connectDB();
//
// const app = express();
//
// // 서버 초기화 관련 로더 로드
// loaders.expressLoader(app);
//
// // 기본적인 미들웨어 설정
// app.use(express.json());  // JSON 요청 본문을 파싱
// app.use(express.urlencoded({ extended: true }));  // URL-encoded 요청 본문을 파싱
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
//
// // app.listen(config.port, () => {
// //     console.log(`Server is running on http://localhost:${config.port}`);
// // });
