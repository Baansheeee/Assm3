const express = require('express');
const {registerHandler, loginHandler, testHandler, forgotHandler, adminLoginHandler, getTotalUsers, updateProfile, getUserById} = require('../controllers/authHandlers');
const{ requireSignIn, isAdmin} = require('../middlewares/authmiddleware')

const router = express.Router();

// Register route
router.post('/register', registerHandler);

// Login route
router.post('/login', loginHandler);

//Admin route
router.post('/admin', adminLoginHandler);

// Test route
router.get('/test', requireSignIn, isAdmin, testHandler);

//Forgot password
router.post('/forgot', forgotHandler);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true});
})

router.get('/admin-auth',requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});
})

//getTotalUsers
router.get('/total-users', getTotalUsers)

//update Profile
router.put('/profile',requireSignIn, updateProfile)

//get user details
router.get('/user/:id', getUserById);
module.exports = router;
