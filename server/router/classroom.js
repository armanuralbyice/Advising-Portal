const express = require('express');
const { addClassrooms, getAllClassrooms, deleteClassroom } = require("../controller/courseController/classroomController");
const {authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");



const router = express.Router();
router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/all').get(authenticateRegister,getAllClassrooms)
router.route('/save').post(authenticateRegister,addClassrooms)
router.route('/delete/:id').delete(authenticateRegister,deleteClassroom)

module.exports = router;