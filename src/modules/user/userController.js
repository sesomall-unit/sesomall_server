// 서비스를 호출하여 HTTP 요청을 처리
const userService = require('./userService');

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
        res.success(users);  // 성공 응답 처리
    } catch (error) {
        console.error('Error in getUsers??????', error);
        res.error('Failed to retrieve users');  // 오류 응답 처리
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (user) {
            res.success(user);  // 성공 응답 처리
        } else {
            return res.error('User not found', 404);  // 404 오류 응답 처리
        }
    } catch (error) {
        res.error('Internal server error');  // 500 오류 응답 처리
    }
};

// 다른 컨트롤러 함수들...

module.exports = {
    getAllUsers,
    getUserById,
};
