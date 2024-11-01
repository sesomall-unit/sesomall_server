// 모델을 정의하여 데이터베이스의 테이블과 매핑 역할

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "birthdate",
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "phone_number",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // ENUM 타입으로 설정
      allowNull: false,
      defaultValue: "user", // 기본 역할을 'user'로 설정
    },
    // 다른 필드들...
  },
  {
    tableName: "users", // 데이터베이스의 테이블 이름을 'users' 로 명시적으로 지정
    timestamps: false, // createdAt 및 updatedAt 필드를 자동으로 추가
  }
);

module.exports = User;
