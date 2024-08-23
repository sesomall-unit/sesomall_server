// 디비 설정 및 연결
// const mongoose = require('mongoose'); // 몽고 디비
// pg (PostgreSQL을 Node.js에서 사용할 수 있게 해주는 라이브러리) 또는 sequelize (ORM) 등을 사용할 수 있음

const { Pool } = require('pg');
const config = require('./env');

const pool = new Pool({
    user: config.dbUser,       // PostgreSQL 사용자명
    host: config.dbHost,       // 데이터베이스 호스트 (예: localhost)
    database: config.dbName,   // 데이터베이스 이름
    password: config.dbPassword, // PostgreSQL 비밀번호
    port: config.dbPort,       // PostgreSQL 포트 (기본값: 5432)
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('PostgreSQL Database connected successfully');
    } catch (error) {
        console.error('PostgreSQL Database connection error:', error);
        process.exit(1); // 실패 시 프로세스 종료
    }
};

module.exports = { pool, connectDB };