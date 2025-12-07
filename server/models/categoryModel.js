const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type:String
    },
    slug:{
        type: String,
        lowercase: true
    },
    photo:{
        data: Buffer,
        contentType: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps:true})

module.exports = mongoose.model('categoryModel', categorySchema);