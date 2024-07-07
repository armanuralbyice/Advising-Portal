const express = require('express');
const { createSemester, getAllSemester, deleteSemester } = require("../controller/semesterController");
const {authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");

const router = express.Router();

router.use(authenticateRegister);
router.use(authorizeRegisterRoles);
router.route('/save').post(createSemester)
router.route('/all').get(getAllSemester)
router.route('/delete/:id').delete( deleteSemester)

module.exports = router;