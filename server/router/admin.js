const express = require('express');
const { addAdmin, getAllAdmin, getAdminById, deleteAdmin } = require("../controller/userController/adminController");



const router = express.Router();

router.route('/admin/register').post(addAdmin)
router.route('/admins/all').get(getAllAdmin)
router.route('/admin/:adminID').get(getAdminById)
// router.route('/admin/delete/:adminID').delete(deleteAdmin)

module.exports = router;