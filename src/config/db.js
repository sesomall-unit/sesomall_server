// 디비 설정 및 연결


// const { Pool } = require('pg');
// const config = require('./env');


// const pool = new Pool({
//     user: config.dbUser,       // PostgreSQL 사용자명
//     host: config.dbHost,       // 데이터베이스 호스트 (예: localhost)
//     database: config.dbName,   // 데이터베이스 이름
//     password: config.dbPassword, // PostgreSQL 비밀번호
//     port: config.dbPort,       // PostgreSQL 포트 (기본값: 5432)
// });

// const connectDB = async () => {
//     try {
//         await pool.connect();
//         console.log('PostgreSQL Database connected successfully');
//     } catch (error) {
//         console.error('PostgreSQL Database connection error:', error);
//         process.exit(1); // 실패 시 프로세스 종료
//     }
// };
// module.exports = { pool, connectDB };

// Sequelize
const { Sequelize } = require('sequelize');
const pg = require('pg');  // PostgreSQL 클라이언트 명시적으로 불러오기
const config = require('./env');

const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    dialect: config.dbDIALECT,  // 예: 'postgres'
    dialectModule: pg,  // 명시적으로 PostgreSQL 클라이언트 전달

});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // 연결 실패 시 프로세스 종료
    }
};

module.exports = { sequelize, connectDB };
