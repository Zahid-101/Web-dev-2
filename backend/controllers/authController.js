const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            const error = new Error('Please add all fields');
            error.statusCode = 400;
            throw error;
        }

        // Check if user exists
        const userExists = await User.findByEmail(email);

        if (userExists) {
            const error = new Error('User already exists');
            error.statusCode = 400;
            throw error;
        }

        // Create user
        const userId = await User.create({
            name,
            email,
            password,
            role // Optional, defaults to 'user' in model
        });

        if (userId) {
            res.status(201).json({
                success: true,
                data: {
                    _id: userId,
                    name,
                    email,
                    role: role || 'user',
                    token: generateToken(userId)
                }
            });
        } else {
            const error = new Error('Invalid user data');
            error.statusCode = 400;
            throw error;
        }

    } catch (err) {
        next(err);
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            const error = new Error('Please add email and password');
            error.statusCode = 400;
            throw error;
        }

        // Check for user email
        const user = await User.findByEmail(email);

        if (user && (await User.matchPassword(password, user.password))) {
            res.json({
                success: true,
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id)
                }
            });
        } else {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    registerUser,
    loginUser
};
