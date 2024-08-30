const express = require('express');
const userRoutes = require('../../modules/user/userRoutes');
// const productRoutes = require('../modules/product/productRoutes');

const router = express.Router();


// /api/v1/user 관련 라우터
router.use('/user', userRoutes);

// /api/v1/product 관련 라우터
// router.use('/product', productRoutes);

module.exports = router;