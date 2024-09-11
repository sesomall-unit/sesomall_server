const config = require('./config/env');
const { initializeApp } = require('./loaders/index');

const startServer = async () => {
    const app = await initializeApp();

// 서버 시작: http 서버를 생성해주는 함수
    const PORT = process.env.PORT || 3030;
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
};

startServer().catch(error => {
    console.error('서버 시작 실패:', error);
    process.exit(1);
});