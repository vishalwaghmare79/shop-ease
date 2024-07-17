const express = require('express')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000

app.get('/', (req, res) => {
    res.send('welcome to shopEase')
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})