const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authmiddleware');
const { 
    createOrder, 
    getAllOrders, 
    getUserOrders, 
    updateOrderStatus 
} = require('../controllers/orderHandlers');

const router = express.Router();

// Create order
router.post('/create-order', requireSignIn, createOrder);

// Get all orders (admin)
router.get('/get-all-orders', getAllOrders);

// Get user orders
router.get('/get-user-orders', requireSignIn, getUserOrders);

// Update order status (admin)
router.put('/update-order-status/:orderId', updateOrderStatus);

module.exports = router;

