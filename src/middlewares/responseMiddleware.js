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

    res.error = (message = responseMessages.SERVER_ERROR.message, status = responseMessages.SERVER_ERROR.status, customCode = null) => {
        const responsePayload = {
            status,
            message,
            data: null,
            timestamp: new Date().toISOString(),
        };

        // 커스텀 코드가 제공된 경우 추가
        if (customCode) {
            responsePayload.customCode = customCode; // 예: { customCode: 1001 }
        }

        res.status(status).json(responsePayload);
    };

    next();  // 다음 미들웨어 또는 라우트로 진행
};
