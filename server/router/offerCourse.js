const express = require('express');
const {offerCourse, deleteOfferCourse} = require("../controller/courseController/offerCourseController");


const router = express.Router();

router.route('/offerCourse/add').post(offerCourse)
router.route('/offerCourse/delete/:offerCourse').delete(deleteOfferCourse)


module.exports=router;