const express = require('express')
const app = express()
const port = 3000
const route = require('./routes');
const db = require('./config/db/index');
const dotenv = require('dotenv');
dotenv.config();
// Connect to DB
db.connect();
app.use(express.json());

// Routes init
route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
