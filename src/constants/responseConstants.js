module.exports = {
    SUCCESS: {
        status: 200,
        message: 'Success'
    },
    BAD_REQUEST: {
        status: 400,
        message: 'Bad Request'
    },
    UNAUTHORIZED: {
        status: 401,
        message: 'Unauthorized'
    },
    FORBIDDEN: {
        status: 403,
        message: 'Forbidden'
    },
    NOT_FOUND: {
        status: 404,
        message: 'Not Found'
    },
    SERVER_ERROR: {
        status: 500,
        message: 'Internal Server Error'
    },
    TOKEN_EXPIRED:{
        status: 401,
        customCode: 1001,
        message: 'Access token expired'
    },
    REFRESH_TOKEN_EXPIRED:{
        status: 401,
        customCode: 1003,
        message: 'Refresh token expired'
    }
};
