const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // 에러 스택을 콘솔에 출력

    res.status(500).json({
        message: 'Something went wrong on the server.',
        error: process.env.NODE_ENV === 'production' ? null : err.message, // 개발 환경에서만 에러 메시지 포함
    });
};

module.exports = errorHandler;