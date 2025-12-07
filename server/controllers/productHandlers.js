const productModel = require('../models/productModel')
const categoryModel = require('../models/categoryModel')
const fs = require('fs'); 
const slugify = require('slugify')

createProduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(400).send({
                    success: false,
                    message: 'Name is required'
                })
            case !description:
                return res.status(400).send({
                    success: false,
                    message: 'Description is required'
                })
            case !price:
                return res.status(400).send({
                    success: false,
                    message: 'Price is required'
                })
            case !category:
                return res.status(400).send({
                    success: false,
                    message: 'Category is required'
                })
            case !quantity:
                return res.status(400).send({
                    success: false,
                    message: 'Quantity is required'
                })
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    success: false,
                    message: 'Photo size should not exceed 1MB'
                })
        }
        const products = await productModel({...req.fields, slug:slugify(name)
        })
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        } 
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in creating product',
            error
        })
    }
};

getProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").populate('category').limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            totalProducts: products.length,
            message: 'Products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error
        })
    }
};

getSingleProduct = async (req,res)=>{
    try {
        const product = await productModel.findOne({slug: req.params.slug}).populate('category')
        res.status(200).send({
            success: true,
            message: 'Single Product fetched successfully',
            product,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting that product'
        });
    }
};
getPhotos = async (req,res)=>{
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting product photo'
        })
    }
};

updateProduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        switch (true) {
            case !name:
                return res.status(400).send({
                    success: false,
                    message: 'Name is required'
                })
            case !description:
                return res.status(400).send({
                    success: false,
                    message: 'Description is required'
                })
            case !price:
                return res.status(400).send({
                    success: false,
                    message: 'Price is required'
                })
            case !category:
                return res.status(400).send({
                    success: false,
                    message: 'Category is required'
                })
            case !quantity:
                return res.status(400).send({
                    success: false,
                    message: 'Quantity is required'
                })
            case photo && photo.size > 1000000:
                return res.status(400).send({
                    success: false,
                    message: 'Photo size should not exceed 1MB'
                })
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)}, {new: true})
        if(photo){
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in updating product',
            error
        })
    }
};

deleteProduct = async (req, res) => {
    try {
        const product = await productModel.findOneAndDelete(req.params.pid).select("-photo")
        res.status(200).send({
            success: true,
            message: 'Product deleted successfully',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in deleting product',
            error
        })
    }
}

filterProduct = async (req,res)=>{
    try {
        const {checked} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked
        const products = await productModel.find(args).populate('category')
        res.status(200).send({
            success: true,
            message: 'Products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in filtering products',
            error
        })
    }
}

getProductCount = async (req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: 'Product count fetched successfully',
            total,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting product count',
            error
        })
    }
}

getProductList = async (req,res)=>{
    try {
        const perPage = 9
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt: -1}).populate("category")
        res.status(200).send({
            success: true,
            message: 'Products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting product list',
            error
        })
    }
}

getSearch = async (req,res)=>{
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                {name: {$regex :keyword, $options:"i"}},
                {description: {$regex :keyword, $options:"i"}}
            ]
        }).select("-photo").populate("category")
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in searching products',
            error
        })
    }
}   

getSimilar = async (req,res)=>{
    try {
        const {pid,cid} = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid },
        }).select("-photo").limit(3).populate("category") 
        // $ne means not included
        res.status(200).send({
            success: true,
            message: 'Similar products fetched successfully',
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting similar products',
            error
        })
    }
}

getCategoryProducts = async (req,res)=>{
    try {
        const category = await categoryModel.find({slug:req.params.slug});
        const products = await productModel.find({category}).populate("category");
        res.status(200).send({
            success: true,
            message: 'Similar products fetched successfully',
            category,
            products,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in getting products',
            error
        })
    }
}

module.exports = { createProduct, getProducts, getSingleProduct,getPhotos, updateProduct, deleteProduct, filterProduct, getProductCount, getProductList, getSearch, getSimilar, getCategoryProducts };