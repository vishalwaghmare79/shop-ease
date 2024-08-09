const express = require('express');
const connectDB = require('./db/server');
const usersRouter = require('./routes/usersRouter'); 
const cors = require('cors');
require('dotenv').config();
const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Use the usersRouter for routes starting with '/api/users'
app.use('/api/users', usersRouter);

// Default route to welcome message
app.get('/', (req, res) => {
    res.send('Welcome to ShopEase');
});

// Connect to the database and start the server
connectDB()
    .then(() => {
        // Start the server on the specified port
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        // Handle any errors connecting to the database
        console.error('Error connecting to Database:', error.message);
    });
