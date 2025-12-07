const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoute');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Middlewares
app.use(cors()); // Allow requests from all origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/order', orderRoute);

// API health check
app.get('/', (req, res) => {
  res.send('Hello, World from Elastic Beanstalk!');
});

// Port handling for EB
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});