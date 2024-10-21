
const express = require('express');
const productController = require('./productController');

const router = express.Router();

router.get('/', productController.getProductList);
router.get('/:id', productController.getProductDetail)

module.exports = router;
