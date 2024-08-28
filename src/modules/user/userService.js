const userModel = require('./userModel');

const fetchAllUsers = async () => {
    const users = await userModel.getAllUsers();
    console.log('Users:', users); // 콘솔에 user 테이블의 데이터 출력

    // 필요한 경우 데이터 가공 작업 수행
    return users;
};

module.exports = {
    fetchAllUsers,
};
