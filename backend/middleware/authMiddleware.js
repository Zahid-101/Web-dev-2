const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findById(decoded.id);

            next();
        } catch (error) {
            console.error(error);
            const err = new Error('Not authorized');
            err.statusCode = 401;
            next(err);
        }
    }

    if (!token) {
        const error = new Error('Not authorized, no token');
        error.statusCode = 401;
        next(error);
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        const error = new Error('Not authorized as an admin');
        error.statusCode = 403;
        next(error);
    }
};

module.exports = { protect, admin };
