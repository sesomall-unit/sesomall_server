// 비즈니스 로직을 구현 : 사용자 조회 로직

const User = require('./userModel');

const getAllUsers = async () => {
    return await User.findAll();
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

// 다른 서비스 함수들...

module.exports = {
    getAllUsers,
    getUserById,
};
