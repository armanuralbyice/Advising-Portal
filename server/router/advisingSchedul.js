const express = require('express');
const {createAdvisingSchedule} = require("../controller/advisingScheduleController");
const {enrollCourse,facultyCourseListBySemester,facultyEnrollCoursesStudentList} = require("../controller/courseController/enrollCourseController");

const router = express.Router();

router.route('/advising-schedule').post(createAdvisingSchedule)
router.route('/advising').post(enrollCourse)
router.route('/faculty-course-list/:semesterId').get(facultyCourseListBySemester)
router.route('/faculty-course-list').get(facultyEnrollCoursesStudentList)

module.exports=router;