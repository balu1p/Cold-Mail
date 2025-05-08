const express = require('express');
const cors = require("cors");
require("dotenv").config();

const emailRoute = require('./routes/emailRoute')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/email', emailRoute);

app.listen(3000, ()=> {
    console.log('app listening on port 3000');
})