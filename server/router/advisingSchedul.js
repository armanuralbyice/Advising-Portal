const express = require('express');
const {createAdvisingSchedule} = require("../controller/advisingScheduleController");
const {enrollCourse,facultyCourseListBySemester,facultyEnrollCoursesStudentList, getOfferCoursesByAdvising,
    getAdvisingCourses, deleteEnrollCourseById
} = require("../controller/courseController/enrollCourseController");

const {authenticateStudent, authenticateFaculty} = require("../middleware/auth");
const {deleteOfferCourse} = require("../controller/courseController/offerCourseController");

const router = express.Router();

router.route('/advising/offerCourses').get(authenticateStudent, getOfferCoursesByAdvising)
router.route('/advising/course').get(authenticateStudent, getAdvisingCourses)
router.route('/advising/course/delete/:courseId').delete(authenticateStudent, deleteEnrollCourseById)
router.route('/advising-schedule').post(createAdvisingSchedule)
router.route('/advising').post(authenticateStudent,enrollCourse)
router.route('/faculty-course-list/:semesterId').get(authenticateFaculty,facultyCourseListBySemester)
router.route('/faculty-course-list/:courseId/:semesterId').get(facultyEnrollCoursesStudentList)


module.exports=router;