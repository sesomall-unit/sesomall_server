// src/modules/admin/userManagement/services/adminUserService.js
const User = require("../../user/userModel"); // User 모델 경로 조정

// 사용자 생성 서비스
const createUser = async (userData) => {
  const { email, password, userName, birthdate, phoneNumber, address, role } =
    userData;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    userName,
    birthdate,
    phoneNumber,
    address,
    role: role || "user",
  });

  return newUser;
};

// 모든 사용자 조회 서비스
const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] }, // 비밀번호 제외
  });
  return users;
};

// 특정 사용자 업데이트 서비스
const updateUser = async (id, updateData) => {
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  const [updatedRows, [updatedUser]] = await User.update(updateData, {
    where: { id },
    returning: true,
    individualHooks: true,
  });

  if (updatedRows === 0) {
    return null;
  }

  return updatedUser;
};

// 특정 사용자 삭제 서비스
const deleteUser = async (id) => {
  const deletedRows = await User.destroy({ where: { id } });
  return deletedRows > 0;
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
