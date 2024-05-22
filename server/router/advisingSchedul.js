const express = require('express');
const {createAdvisingSchedule} = require("../controller/advisingScheduleController");



const router = express.Router();

router.route('/advising-schedule').post(createAdvisingSchedule)

module.exports=router;