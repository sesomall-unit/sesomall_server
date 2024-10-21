const Product = require("./productModel")
const { Op } = require('sequelize');

// 상품 조회 필터
const getProductList = async (priceArr, product_name)=> {
    try {
        const whereClause = {};

        // 상품명이 있을 경우 Like 절로 필터링 추가
        if (product_name) {
            whereClause.product_name = {
                [Op.like]: `%${product_name}%` // 부분 일치하는 상품명 검색
            };
        }

        // 가격이 문자열 배열 => 숫자로 변환 및 NaN 제거
        const prices = priceArr.map(price => parseInt(price, 10)).filter(price => !isNaN(price));

        // console.log("prices",prices)

        // 가격 범위 필터링 추가
        if (prices.length > 0) {
            whereClause.price = {
                [Op.or]: prices.map(price => ({
                    [Op.and]: [
                        { [Op.gte]: price }, // 가격이 해당 값 이상(gte)
                        { [Op.lt]: price + 10000 } // 가격이 해당 값 + 1만원 미만(lt)
                    ]
                }))
            };
        }

        // 제품 조회
        const products = await Product.findAll({ where: whereClause });
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// 상품 ID로 상품 상세 정보 가져오기
const getProductById = async (id) => {
    try {
        const productsDetail = await Product.findOne({
            where: { id } ,  // where 절로 조건 전달
        });
        if (productsDetail) {
            return productsDetail;
        } else {
            return null;  // 제품을 찾지 못한 경우
        }
    } catch (error) {
        console.error('Error fetching productsDetail:', error);
        throw error;
    }
};


module.exports = {
    getProductList,
    getProductById
};