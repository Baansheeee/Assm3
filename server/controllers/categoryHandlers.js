const categoryModel = require('../models/categoryModel');
const fs = require('fs');
const slugify = require('slugify');

const categoryHandler = async (req, res) => {
    try {
        const { name,description } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(400).send({
                    success: false,
                    message: 'Name is required'
                });
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    success: false,
                    message: 'Photo size should not exceed 1MB'
                });
            case !description:
                return res.status(400).send({
                    success: false,
                    message: 'Description is required'
                });
        }

        const existingCategory = await categoryModel.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category already exists'
            });
        }

        const category = new categoryModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
        }
        await category.save();
        res.status(201).send({
            success: true,
            message: 'Category added successfully',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating category',
            error
        });
    }
};

const updateCategoryHandler = async (req, res) => {
    try {
        const { name } = req.fields;
        const { photo } = req.files;
        const { description } = req.fields;
        const { id } = req.params;


        switch (true) {
            case !name:
                return res.status(400).send({
                    success: false,
                    message: 'Name is required'
                });
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    success: false,
                    message: 'Photo size should not exceed 1MB'
                });
            case !description:
                return res.status(400).send({
                    success: false,
                    message: 'Description is required'
                });
        }

        const category = await categoryModel.findByIdAndUpdate(
            id,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );

        if (photo) {
            category.photo.data = fs.readFileSync(photo.path);
            category.photo.contentType = photo.type;
        }

        await category.save();
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating category',
            error
        });
    }
};

const getCategoryHandler = async (req, res) => {
    try {
        const categories = await categoryModel.find({}).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Categories retrieved successfully',
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting categories',
            error
        });
    }
};

const singleCategoryHandler = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug }).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Category retrieved successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting that category',
            error
        });
    }
};

const deleteCategoryHandler = async (req, res) => {
    try {
        const category = await categoryModel.findByIdAndDelete(req.params.id).select('-photo');
        res.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting category',
            error
        });
    }
};

const getCategoryPhotoHandler = async (req, res) => {
    try {
        const category = await categoryModel.findById(req.params.id).select('photo');
        if (category.photo.data) {
            res.set('Content-type', category.photo.contentType);
            return res.status(200).send(category.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting category photo',
            error
        });
    }
};

module.exports = {
    categoryHandler,
    updateCategoryHandler,
    getCategoryHandler,
    singleCategoryHandler,
    deleteCategoryHandler,
    getCategoryPhotoHandler
};

