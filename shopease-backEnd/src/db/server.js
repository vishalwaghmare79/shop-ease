const mongoose = require('mongoose');

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
    try {
        // Connect to MongoDB using the connection URL from environment variables
        const connHost = await mongoose.connect(process.env.MONGO_URL);

        // Log the host of the connected MongoDB instance
        console.log(`Connected to MongoDB ${connHost.connection.host}`);
    } catch (error) {
        // Log connection errors and exit the process if connection fails
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

// Export the connectDB function for use in other modules
module.exports = connectDB;
