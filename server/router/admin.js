const express = require('express');
const { addAdmin, getAllAdmin, getAdminById, deleteAdmin } = require("../controller/userController/adminController");
const {authenticateRegister, authorizeRegisterRoles} = require("../middleware/auth");



const router = express.Router();

router.use(authenticateRegister)
router.use(authorizeRegisterRoles)
router.route('/admin/save').post(authenticateRegister,addAdmin)
router.route('/admins/all').get(getAllAdmin)
router.route('/admin/:adminID').get(getAdminById)
// router.route('/admin/delete/:adminID').delete(deleteAdmin)

module.exports = router;