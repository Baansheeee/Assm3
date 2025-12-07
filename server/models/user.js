const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ecommerce:ecommerce123@ecommerce.85s1apq.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,  
    },
    address: {
        type: {},
        required: true,
    },
    answer:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {timestamps:true})

module.exports = mongoose.model('user', userModel);
