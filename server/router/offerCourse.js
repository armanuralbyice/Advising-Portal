const express = require('express');
const { offerCourse, deleteOfferCourse, getOfferCourses } = require("../controller/courseController/offerCourseController");


const router = express.Router();

router.route('/offerCourse/add').post(offerCourse)
router.route('/get/offerCourses').get(getOfferCourses)
router.route('/delete/offerCourse').delete(deleteOfferCourse)


module.exports = router;