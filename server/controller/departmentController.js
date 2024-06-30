// const catchAsyncError = require('../middleware/catchAsyncError')
// const Department = require('../../server/model/departmentModel/departmentSchema')
// const ErrorHandler = require('../../server/utils/ErrorHandler')
// // create department
// exports.createDepartment = catchAsyncError(async (req, res, next)=>{
//     const {name} = req.body
//
//     const existingDepartment = await Department.findOne({name})
//     if(existingDepartment){
//         return next (new ErrorHandler('Department already exists',409))
//     }
//     const newDepartment = await new Department({
//         name
//     })
//     await newDepartment.save()
//     res.status(201).json({
//         status: 'success',
//         newDepartment,
//     });
// })
// //get all department
// exports.getAllDepartment = catchAsyncError(async (req, res, next) => {
//     const department = await Department.find()
//     res.status(200).json({
//         status: 'success',
//         department
//     })
// })
// exports.deleteDepartment = catchAsyncError(async (req,res,nest)=>{
//     const department = await Department.findByIdAndDelete(req.params.id);
//     if (!department) {
//         return res.status(404).json({ message: 'Semester not found' });
//     }
//     res.status(200).json({
//         status: 'success',
//         message: 'Semester deleted successfully'
//     });
// })