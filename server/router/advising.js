const express = require('express');
const { createAdvisingSchedule } = require("../controller/advisingScheduleController");
const { enrollCourse, facultyCourseListBySemester, facultyEnrollCoursesStudentList, getOfferCoursesByAdvising,
    getAdvisingCourses, deleteEnrollCourseById
} = require("../controller/courseController/enrollCourseController");

const { authenticateStudent, authenticateFaculty, authenticateRegister} = require("../middleware/auth");

const router = express.Router();

router.route('/advising/offerCourses').get(authenticateStudent, getOfferCoursesByAdvising)
router.route('/advising/course').get(authenticateStudent, getAdvisingCourses)
router.route('/advising/course/delete/:courseId').delete(authenticateStudent, deleteEnrollCourseById)
router.route('/advising').post(authenticateStudent, enrollCourse)

router.route('/advising-schedule').post(authenticateRegister, createAdvisingSchedule)

router.route('/faculty-course-list/:semesterId').get(authenticateFaculty, facultyCourseListBySemester)
router.route('/faculty-course-list/:courseId/:semesterId').get(authenticateFaculty, facultyEnrollCoursesStudentList)


module.exports = router;