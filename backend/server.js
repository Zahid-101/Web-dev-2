const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Import Routes
const itemRoutes = require('./routes/itemRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Security Middleware
// Helmet helps secure your apps by setting various HTTP headers
app.use(helmet());

// 2. CORS Configuration
// In production, we restrict access to your specific frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// 3. Body Parser
app.use(express.json());

// 4. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);

// 5. Health Check Route
// Essential for AWS monitoring and verifying your deployment
app.get('/', (req, res) => {
    res.status(200).send('🚀 Urban Harvest Hub API is live and running on AWS EC2!');
});

// 6. Error Handling Middleware (Must be last)
app.use(errorHandler);

// 7. Start Server
// We bind to '0.0.0.0' so the EC2 instance accepts external traffic
app.listen(PORT, '0.0.0.0', () => {
    console.log(`
    =========================================
    SERVER STATUS: ONLINE
    MODE: ${process.env.NODE_ENV || 'development'}
    PORT: ${PORT}
    URL: http://54.255.154.202:${PORT}
    =========================================
    `);
});