const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        lowercase: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'categoryModel',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String,
    },
    shipping:{
        type: Boolean,
        default: false
    }
}, {timestamps:true})

module.exports = mongoose.model('productModel', productSchema);