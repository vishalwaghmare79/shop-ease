const { User } = require("../models/userSchema.Model");
const { hashPassword, comparePassword } = require("../utils/userSecure");
const JWT = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

    if (!name || !email || !password || !address || !phone) {
      return res.status(400).send({
        error: "All fields are required: name, email, password,",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already registered. Please login.",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      address,
      phone,
    });

    const savedUser = await newUser.save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Both email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered.",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password.",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const protectedController = (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      message: "Protected route accessed successfully",
      user: {
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error accessing protected route:", error.message);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { protectedController };

module.exports = { signupController, loginController, protectedController };
