const jwt = require('jsonwebtoken');
const { User } = require('../models/userSchema.Model');

// Middleware to check for valid JWT token and authenticate user
const requireSignIn = (req, res, next) => {
    const token = req.header('Authorization'); // Extract token from header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' }); // Token missing
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify token
        req.user = decoded; // Attach user info to request
        next(); // Proceed to next middleware or route
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Token is not valid' }); // Invalid token
    }
};

// Middleware to check if the authenticated user is an admin
const isAdmin = async (req, res, next) => {
    try {
        const userId = req.user._id; // Get user ID from request
        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // User not found
        }

        if (user.role !== 1) {
            return res.status(403).json({ message: 'Access denied. Admins only' }); // Not an admin
        }

        next(); // Proceed to next middleware or route
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message }); // Server error
    }
};

module.exports = { requireSignIn, isAdmin };
