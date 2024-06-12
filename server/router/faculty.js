const express = require('express');
const {addFaculty, getAllFaculties, getFacultyByID, deleteFaculty, getFacultyByDepartmentID,
    getFacultiesByDepartment
} = require("../controller/userController/facultyController");

const router = express.Router();

router.route('/faculty/register').post(addFaculty)
router.route('/department/:departmentId/faculties').get(getFacultiesByDepartment)
router.route('/faculties/all').get(getAllFaculties)
router.route('/faculty/:facultyID').get(getFacultyByID)
// router.route('/delete/faculty/:facultyID').delete(deleteFaculty)


module.exports=router;