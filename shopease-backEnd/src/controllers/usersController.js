const { User } = require("../models/userSchema.Model");
const { hashPassword, comparePassword } = require("../utils/userSecure");
const JWT = require("jsonwebtoken");

// Controller for handling user signup
const signupController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !password || !address || !phone) {
      return res.status(400).json({
        success: false,
        error: "All fields are required.",
      });
    }

    // Check if the email is already associated with an existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    // Securely hash the user's password before storing it
    const hashedPassword = await hashPassword(password);

    // Create a new User instance with the provided data
    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Store the hashed password, not the plain text one
      address,
      phone,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with a success message and the newly created user data
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);

    // Return a 500 status code indicating a server-side error
    res.status(500).json({ 
      success: false,
      error: "Internal Server Error" 
    });
  }
};

// Login controller to handle user login requests
const loginController = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Both email and password are required.",
      });
    }

    // Find the user by email in the database
    const user = await User.findOne({ email });
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered.",
      });
    }

    // Compare the provided password with the stored hashed password
    const match = await comparePassword(password, user.password);
    
    // If the passwords don't match, return a 401 error
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password.",
      });
    }

    // Generate a JWT token with the user's ID and a secret key
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    // Respond with a success message, user details (excluding sensitive info), and the token
    res.status(200).send({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,    // User ID
        name: user.name, // User name
        email: user.email, // User email
      },
      token, // JWT token
    });
  } catch (error) {
    // Log any errors and respond with a 500 Internal Server Error
    console.error("Error logging in user:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Controller for handling requests to a protected route
const protectedController = (req, res) => {
  try {
    const user = req.user; // Extract the user information from the request

    res.status(200).json({
      message: "Protected route accessed successfully",
      user: {
        id: user._id, // Only return the user's ID
      },
    });
  } catch (error) {
    console.error("Error accessing protected route:", error.message);

    // Handle any server-side errors that occur while accessing the protected route
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = { protectedController };

module.exports = { signupController, loginController, protectedController };
