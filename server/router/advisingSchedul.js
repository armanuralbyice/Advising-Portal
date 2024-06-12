const express = require('express');
const {createAdvisingSchedule} = require("../controller/advisingScheduleController");
const {enrollCourse,facultyCourseListBySemester,facultyEnrollCoursesStudentList} = require("../controller/courseController/enrollCourseController");

const {authenticateStudent, authenticateFaculty} = require("../middleware/auth");

const router = express.Router();

router.route('/advising-schedule').post(createAdvisingSchedule)
router.route('/advising').post(authenticateStudent,enrollCourse)
router.route('/faculty-course-list/:semesterId').get(authenticateFaculty,facultyCourseListBySemester)
router.route('/faculty-course-list/:courseId/:semesterId').get(facultyEnrollCoursesStudentList)

module.exports=router;