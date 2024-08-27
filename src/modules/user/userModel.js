const { pool } = require('../../config/db');

const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
};

module.exports = {
    getAllUsers,
};
