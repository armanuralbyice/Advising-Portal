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
const advisingScheduleRouter = require('./router/advising')
const loginRouter = require('../server/router/login')
const cron = require('node-cron');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const updateIsActiveField = require('././middleware/advisingScheduleFieldsUpdate'); // Update this path
const app = express()

app.use(express.json())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Authorization', 'Content-Type']
// }));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
cron.schedule('* * * * *', updateIsActiveField);

const PORT = process.env.PORT || 3001
const DB = process.env.DB

mongoose.set('strictQuery', true);
mongoose
    .connect(DB)
    .then(() => console.log('Database connection successfully'))
    .catch((err) => console.log(err));

app.use('/semester', semesterRouter)
app.use('/department', departmentRouter)
app.use('/user', studentRouter)
app.use('/user', facultyRouter)
app.use('/user', adminRouter)
app.use('/course', courseRouter)
app.use('/offer-course', offerCourseRouter)
app.use('/classroom', classroomRouter)
app.use('/api/v7', advisingScheduleRouter)
app.use('/auth', loginRouter)
app.use(ErrorHandler)
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
