// const catchAsync = require('../../middleware/catchAsyncError')
// const ErrorHandler = require('../../utils/ErrorHandler')
// const { addAdminAndSendEmail} = require("../../middleware/sendEmail");
// const Admin = require("../../model/adminModel/adminSchema");
//
// // for add register
// exports.addAdmin = catchAsync(async (req, res) => {
//     const emailExists = await Admin.findOne({ email: req.body.email });
//
//     if (emailExists) {
//         return res.status(400).json({
//             success: false,
//             message: 'Email already exists.',
//         });
//     }
//     await addAdminAndSendEmail(req, res);
// })
//
// // for get all register
// exports.getAllAdmin = catchAsync(async (req, res) => {
//     const admins = await Admin.find().populate('department', 'name');
//     res.status(200).json({
//         success: true,
//         admins
//     })
// })
//
// // for get admin by adminID
// exports.getAdminById = catchAsync(async (req, res,next) => {
//     const adminID = req.params.adminID;
//     const admin = await Admin
//         .findOne({adminID:adminID})
//     if(!admin){
//         return next(new ErrorHandler('Admin not found',404))
//     }
//     res.status(200).json({
//         success: true,
//         admin,
//     })
// })