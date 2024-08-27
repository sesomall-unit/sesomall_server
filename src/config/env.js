// 환경 변수 설정
// 환경 변수: 데이터베이스 연결 정보, API 키, 포트 번호
// dotenv 라이브러리를 사용

// require('dotenv').config(); // .env 파일의 내용을 process.env로 불러오기
//
// module.exports = {
//     port: process.env.PORT || 3000,
//     dbUri: process.env.DB_URI || 'mongodb://localhost:27017/myapp',
//     jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
//     nodeEnv: process.env.NODE_ENV || 'development',
// };

require('dotenv').config();  // .env 파일에서 환경 변수를 로드

module.exports = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'your_username',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'your_db_name',
    dbPassword: process.env.DB_PASSWORD || 'your_password',
    dbPort: process.env.DB_PORT || 5432,
};
