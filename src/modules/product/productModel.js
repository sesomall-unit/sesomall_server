const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/db');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "상품 아이디"
    },
    user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "사용자 아이디"
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "상품 이름"
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "상품 간단 설명"
    },
    price: {
        type: DataTypes.BIGINT,
        allowNull: false,
        comment: "상품 가격"
    },
    stock_quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "재고량"
    },
    sku: {
        type: DataTypes.BIGINT,
        allowNull: true,
        comment: "상품 관리번호"
    },
    product_status: {
        type: DataTypes.ENUM('available', 'unavailable', 'discontinued'),
        allowNull: true,
        comment: "재고 상태(판매중, 품절)"
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true,
        comment: "할인율"
    },
    product_image_url: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "상품이미지url"
    },
    product_content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "상품 상세 설명(에디터 설명)"
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: "상품 수정 일자 및 시간"
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        comment: "상품 등록 일자 및 시간"
    },
}, {
    tableName: 'products', // Table name is explicitly defined
    timestamps: false,  // createdAt 및 updatedAt 필드를 자동으로 추가
});

module.exports = Product;
