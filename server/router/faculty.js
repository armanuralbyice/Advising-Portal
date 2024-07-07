const express = require('express');
const { addFaculty, getAllFaculties, getFacultyByID, deleteFaculty, getFacultyByDepartmentID,
    getFacultiesByDepartment
} = require("../controller/userController/facultyController");
const { authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");

const router = express.Router();

router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/faculty/save').post(addFaculty)
router.route('/department/:departmentId/faculties').get(authenticateRegister,getFacultiesByDepartment)
router.route('/faculties/all').get(getAllFaculties)
router.route('/faculty/:facultyID').get(authenticateRegister,getFacultyByID)
// router.route('/delete/faculty/:facultyID').delete(deleteFaculty)


module.exports = router;