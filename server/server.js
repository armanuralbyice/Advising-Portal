const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ErrorHandler = require('./middleware/errors')
const semesterRouter = require('../server/router/semester')
// const updateIsActiveField = require('././middleware/advisingScheduleFieldsUpdate'); // Update this path
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'https://advising-portal-two.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

const PORT = process.env.PORT || 3001
const DB = process.env.DB

app.get('/', (req, res) => {
    res.send('Hello, World!'); // Sending a simple response
});

mongoose.set('strictQuery', true);
mongoose
    .connect(DB)
    .then(() => console.log('Database connection successfully'))
    .catch((err) => console.log(err));
app.use('/api/v1', semesterRouter)
app.use(ErrorHandler)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
