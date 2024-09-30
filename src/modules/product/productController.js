// 상품 컨트롤러
const productService = require("./productService")

const getProductList = async (req, res)=> {
    try {
        const { price, product_name } = req.query;
        // const products = await productService.getProductList();
        // 가격을 숫자로 변환하여 필터링 조건으로 사용
        // 가격이 문자열 배열일 경우, 가격을 배열로 변환
        const priceArr = price ? price.split(',') : [];

        console.log("price",price)
        console.log("priceArr",priceArr)

        const products = await productService.getProductList(priceArr, product_name);

        if (products && products.length > 0) {
            res.success({ productList: products });
        } else {
            console.log("데이터 없음");
            res.success({ productList: [] });
        }
    } catch (error){
        console.error('Error in productList', error);
        res.error('Failed to retrieve productList')
    }
}

module.exports = {
    getProductList
};
