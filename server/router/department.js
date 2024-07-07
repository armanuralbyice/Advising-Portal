const express = require('express');

const { createDepartment, getAllDepartment, deleteDepartment } = require("../controller/departmentController");
const { deleteSemester } = require("../controller/semesterController");
const {authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");

const router = express.Router();
router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/save').post(createDepartment)
router.route('/all').get(getAllDepartment)
router.route('/delete/:id').delete(authenticateRegister,deleteDepartment)

module.exports = router;