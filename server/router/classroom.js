const express = require('express');
const { addClassrooms, getAllClassrooms, deleteClassroom } = require("../controller/courseController/classroomController");



const router = express.Router();

router.route('/classroom/all').get(getAllClassrooms)
router.route('/create/classroom').post(addClassrooms)
router.route('/classroom/delete/:id').delete(deleteClassroom)



module.exports = router;