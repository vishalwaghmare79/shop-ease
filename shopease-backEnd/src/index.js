const express = require('express');
const connectDB  = require('./db/server');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Welcome to ShopEase');
});

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to Database:', error.message);
    });


