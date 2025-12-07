const express = require('express')
const formidable = require('express-formidable')

const router = express.Router();

const { createProduct, getProducts, getSingleProduct, getPhotos, updateProduct, deleteProduct, filterProduct, getProductCount, getProductList, getSearch, getSimilar, getCategoryProducts } = require('../controllers/productHandlers');

// Create product
router.post('/create-product',formidable(), createProduct);

// Update product
router.put('/update-product/:pid',formidable(), updateProduct);

//get products
router.get('/get-product',getProducts);

// Get single product
router.get('/get-product/:slug',getSingleProduct);

//get photos
router.get('/product-photo/:pid',getPhotos);

//delete product
router.delete('/delete-product/:pid', deleteProduct);

//Filter products
router.post('/product-filter', filterProduct);

//product count
router.get('/product-count', getProductCount);

//product per page
router.get('/product-list/:page', getProductList);

//search for products
router.get('/search/:keyword', getSearch);

//similar products
router.get('/related-products/:pid/:cid', getSimilar)

//get CategoryProducts
router.get('/products-category/:slug', getCategoryProducts)

module.exports = router;