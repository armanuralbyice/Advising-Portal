const express = require('express');
const { createSemester, getAllSemester, deleteSemester } = require("../controller/SemesterController");

const router = express.Router();
router.route('/create').post(createSemester)
router.route('/all').get(getAllSemester)
router.route('/delete/:id').delete(deleteSemester)

module.exports = router;