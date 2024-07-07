const express = require('express');
const { addCourses, getCourses, getCoursesByDepartment } = require("../controller/courseController/courseController");
const {authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");


const router = express.Router();

router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/save').post(addCourses)
router.route('/all').get(getCourses);
router.route('/filter').get(authenticateRegister, getCoursesByDepartment);



module.exports = router;