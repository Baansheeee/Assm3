const orderModel = require('../models/orderModel');

// Create Order
const createOrder = async (req, res) => {
    try {
        const { products, payment, shippingAddress, totalAmount } = req.body;
        const order = await orderModel.create({
            products,
            payment,
            buyer: req.user._id,
            shippingAddress,
            totalAmount
        });

        res.status(201).send({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating order',
            error
        });
    }
};

// Get All Orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({}).populate("products")
        res.status(200).send({
            success: true,
            message: 'All Orders fetched successfully',
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting orders',
            error
        });
    }
};

// Get User Orders
const getUserOrders = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate('products.product')
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: 'User Orders fetched successfully',
            orders
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in getting user orders',
            error
        });
    }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        
        const order = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating order status',
            error
        });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getUserOrders,
    updateOrderStatus
};

