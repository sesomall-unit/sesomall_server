const responseMessages = require('../constants/responseConstants');

//미들웨어 response 공통 로직 처리
module.exports = (req, res, next) => {
    res.success = (data, message = responseMessages.SUCCESS.message, status = responseMessages.SUCCESS.status) => {
        res.status(status).json({
            status,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    };

    res.error = (message = responseMessages.SERVER_ERROR.message, status = responseMessages.SERVER_ERROR.status) => {
        res.status(status).json({
            status,
            message,
            data: null,
            timestamp: new Date().toISOString()
        });
    };

    next();  // 다음 미들웨어 또는 라우트로 진행
};
