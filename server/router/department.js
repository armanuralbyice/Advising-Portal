const express = require('express');

const {createDepartment, getAllDepartment, deleteDepartment} = require("../controller/departmentController");
const {deleteSemester} = require("../controller/semesterController");

const router = express.Router();
router.route('/create/department').post(createDepartment)
router.route('/departments/all').get(getAllDepartment)
router.route('/department/delete/:id').delete(deleteDepartment)

module.exports=router;