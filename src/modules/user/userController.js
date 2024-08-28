// 사용자 컨트롤러

const userService = require('./userService');

const getUsers = async (req, res) => {
    try {
        const users = await userService.fetchAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getUsers,
};
