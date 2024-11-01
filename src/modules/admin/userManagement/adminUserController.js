// src/modules/admin/userManagement/controllers/adminUserController.js
const adminUserService = require("../userManagement/adminUserService");

// 새로운 사용자 생성 (관리자 권한 필요)
const createUser = async (req, res) => {
  try {
    const user = await adminUserService.createUser(req.body);
    res.status(201).json({
      message: "사용자가 성공적으로 생성되었습니다.",
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        birthdate: user.birthdate,
        phoneNumber: user.phoneNumber,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.error("Internal server error", 500); // 공통 오류 응답 처리
  }
};

// 모든 사용자 조회 (관리자 권한 필요)
const getAllUsers = async (req, res) => {
  try {
    const users = await adminUserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.error("Internal server error", 500); // 공통 오류 응답 처리
  }
};

// 특정 사용자 업데이트 (관리자 권한 필요)
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedUser = await adminUserService.updateUser(id, updateData);
    if (!updatedUser) {
      return res.error("사용자를 찾을 수 없습니다.", 404);
    }
    res.status(200).json({
      message: "사용자가 성공적으로 업데이트되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.error("Internal server error", 500); // 공통 오류 응답 처리
  }
};

// 특정 사용자 삭제 (관리자 권한 필요)
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await adminUserService.deleteUser(id);
    if (!deleted) {
      return res.error("사용자를 찾을 수 없습니다.", 404);
    }
    res.status(200).json({ message: "사용자가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.error("Internal server error", 500); // 공통 오류 응답 처리
  }
};
// 관리자 권한이 필요한 사용자 관리 컨트롤러 함수들을 내보냅니다.
module.exports = {
  createUser, // 새로운 사용자 생성
  getAllUsers, // 모든 사용자 목록 조회
  updateUser, // 특정 사용자 정보 업데이트
  deleteUser, // 특정 사용자 삭제
};
