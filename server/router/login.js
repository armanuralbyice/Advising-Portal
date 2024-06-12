const express = require('express');
const {loginUser, logout} = require("../controller/userController/loginController");

const router = express.Router();

router.route('/login').post(loginUser)
router.route('/logout').get(logout)

module.exports=router;