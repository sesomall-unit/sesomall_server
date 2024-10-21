// 상품 컨트롤러
const productService = require("./productService")
const addonService = require("../addon/addonService")


// 상품 필터 조회 (상품 가격, 상품명)
const getProductList = async (req, res)=> {
    try {
        const { price, product_name } = req.query;
        // const products = await productService.getProductList();
        // 가격을 숫자로 변환하여 필터링 조건으로 사용
        // 가격이 문자열 배열일 경우, 가격을 배열로 변환
        const priceArr = price ? price.split(',') : [];

        // console.log("price",price)
        // console.log("priceArr",priceArr)

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

// 상품 상세 정보 가져오기
const getProductDetail = async (req, res) =>{
 try {
     const productId = req.params.id;
     const productDetail = await productService.getProductById(productId);

     const addonList =  await addonService.getAllAddons()

     console.log("addonList",addonList)

     if(productDetail){
         res.success({productDetail:productDetail, addonList : addonList })
     }else{
         console.log("데이터 없음");
         res.success([]);
     }

 } catch (error){
     console.error('Error in productDetail', error);
     res.error('Failed to retrieve productDetail')
 }
}

module.exports = {
    getProductList,
    getProductDetail
};
