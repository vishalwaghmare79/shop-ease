const express = require('express');
const connectDB = require('./db/server');
const usersRouter = require('./routes/usersRouter'); 
const cors = require('cors')
require('dotenv').config();
const app = express();

app.use(cors())

app.use(express.json());

// Use the router
app.use('/api/users', usersRouter);

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
