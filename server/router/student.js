const express = require('express');

const {addStudents, getStudentsByDepartment, getAllStudents, deleteStudent, getStudentByID} = require("../controller/userController/studentController");

const router = express.Router();

router.route('/student/register').post(addStudents)
router.route('/department/:name/students').get(getStudentsByDepartment)
router.route('/students/all').get(getAllStudents)
router.route('/student/:studentID').get(getStudentByID)
// router.route('/delete/student/:studentID').delete(deleteStudent)

module.exports=router;