const express = require('express');
const { signupController, loginController, protectedController } = require('../controllers/usersController');
const { requireSignIn, isAdmin } = require('../middleware/userMidleware');

const router = express.Router();

// Route for user signup; handles POST requests to /signup
router.post('/signup', signupController);

// Route for user login; handles POST requests to /login
router.post('/login', loginController);

// Route for accessing protected resources; requires authentication and admin role
router.get('/protected', requireSignIn, isAdmin, protectedController);

module.exports = router;
