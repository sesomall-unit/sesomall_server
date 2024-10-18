const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/db');

// 추가 상품
const Addon =sequelize.define('Addon',{
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "추가상품 아이디"
    },
    add_on_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "추가상품 이름"
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "추가상품 가격"
    },
    stock: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "추가상품 재고 수량"
    },
    add_on_status: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "추가상품 상태(품절,활성화)"
    },
    // created_at: {
    //     type: DataTypes.DATE,
    //     allowNull: false,
    //     defaultValue: DataTypes.NOW,
    //     comment: "추가상품 등록 일자 및 시간"
    // },
},{
    tableName:'add_ons',
    timestamps: true, // createdAt, updatedAt 필드 자동 생성
    underscored: true // snake_case로 변환
})

module.exports = Addon;