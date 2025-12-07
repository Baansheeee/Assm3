const express = require('express');
const formidable = require('express-formidable');
const router = express.Router();

const {
    categoryHandler,
    updateCategoryHandler,
    getCategoryHandler,
    singleCategoryHandler,
    deleteCategoryHandler,
    getCategoryPhotoHandler
} = require('../controllers/categoryHandlers');

// Routes
router.post('/create-category', formidable(), categoryHandler);

// Update category 
router.put('/update-category/:id', formidable(), updateCategoryHandler);

// Get all categories
router.get('/get-category', getCategoryHandler);
 
// Get single category
router.get('/single-category/:slug', singleCategoryHandler);

// Delete category
router.delete('/delete-category/:id', deleteCategoryHandler);

// Get category photo
router.get('/category-photo/:id', getCategoryPhotoHandler);

module.exports = router;

