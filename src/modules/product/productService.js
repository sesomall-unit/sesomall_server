const Product = require("./productModel")
const { Op } = require('sequelize');

const getProductList = async (priceArr, product_name)=> {
    try {
        const whereClause = {};

        // 상품명이 있을 경우 필터링 추가
        if (product_name) {
            whereClause.product_name = product_name;
        }

        // 가격이 문자열 배열 => 숫자로 변환 및 NaN 제거
        const prices = priceArr.map(price => parseInt(price, 10)).filter(price => !isNaN(price));

        console.log("prices",prices)

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
        throw error; // 에러를 다시 던져서 컨트롤러에서 처리할 수 있도록 함
    }
}

module.exports = {
    getProductList
};