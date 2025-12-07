const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.ObjectId,
            ref: 'productModel',
        },
        quantity: Number,
    }],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: 'userModel'
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    },
    shippingAddress: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

