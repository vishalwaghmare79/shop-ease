const express = require('express');
const { signupController, loginController, protectedController } = require('../controllers/usersController');
const { requireSignIn, isAdmin } = require('../middleware/userMidleware');


const router = express.Router();

router.post('/signup', signupController);
router.post('/login', loginController);
router.get('/protected',requireSignIn,isAdmin, protectedController)

module.exports = router;
