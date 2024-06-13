const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors');
const ErrorHandler = require('./middleware/errors')
const semesterRouter = require('../server/router/semester')
const departmentRouter = require('../server/router/department')
const studentRouter = require('../server/router/student')
const facultyRouter = require('../server/router/faculty')
const adminRouter = require('../server/router/admin')
const courseRouter = require('../server/router/course')
const offerCourseRouter = require('../server/router/offerCourse')
const classroomRouter = require('../server/router/classroom')
const advisingScheduleRouter = require('../server/router/advisingSchedul')
const loginRouter = require('../server/router/login')
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const updateIsActiveField = require('././middleware/advisingScheduleFieldsUpdate'); // Update this path
const app = express()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type']
}));
// app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// ));
cron.schedule('* * * * *', updateIsActiveField);

const PORT = process.env.PORT || 3001
const DB = process.env.DB

mongoose.set('strictQuery', true);
mongoose
    .connect(DB)
    .then(() => console.log('Database connection successfully'))
    .catch((err) => console.log(err));

app.use('/api/v1', semesterRouter)
app.use('/api/v2', departmentRouter)
app.use('/api/v3', studentRouter)
app.use('/api/v3', facultyRouter)
app.use('/api/v3', adminRouter)
app.use('/api/v4', courseRouter)
app.use('/api/v5', offerCourseRouter)
app.use('/api/v6', classroomRouter)
app.use('/api/v7', advisingScheduleRouter)
app.use('/api/v8', loginRouter)
app.use(ErrorHandler)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
