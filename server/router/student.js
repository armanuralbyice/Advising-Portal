const express = require('express');

const { addStudents, getStudentsByDepartment, getAllStudents, deleteStudent, getStudentByID } = require("../controller/userController/studentController");
const { authenticateRegister, authorizeRegisterRoles} = require('../middleware/auth');

const router = express.Router();

router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/student/save').post(addStudents)
router.route('/department/:name/students').get(authenticateRegister,getStudentsByDepartment)
router.route('/students/all').get(getAllStudents)
router.route('/student/:studentID').get(authenticateRegister,getStudentByID)
// router.route('/delete/student/:studentID').delete(deleteStudent)

module.exports = router;