// 환경 변수 설정 : 데이터베이스 연결 정보, API 키, 포트 번호
// dotenv 라이브러리를 사용
// .env 파일에 있는 환경 변수를 읽어와서 Node.js 애플리케이션에서 사용할 수 있도록

require('dotenv').config(); // .env 파일의 내용을 process.env로 불러오기

module.exports = {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'your_username',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'your_db_name',
    dbPassword: process.env.DB_PASSWORD || 'your_password',
    dbPort: process.env.DB_PORT || 5432,
    dbDIALECT:process.env.DB_DIALECT || 'postgres',
};