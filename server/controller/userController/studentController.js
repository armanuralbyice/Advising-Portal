const Student = require('../../model/studentModel/studentSchema')
const Department = require('../../model/departmentModel/departmentSchema')
const catchAsync = require('../../middleware/catchAsyncError')
const ErrorHandler = require('../../utils/ErrorHandler')
const {addStudentAndSendEmail} = require("../../middleware/sendEmail");

// add student
exports.addStudents = catchAsync(async(req,res, next)=>{
    const emailExists = await Student.findOne({email:req.body.email})
    if(emailExists){
        return next (new ErrorHandler('Email already exist', 400));
    }
    await addStudentAndSendEmail(req, res, next)
})

// get all students
exports.getAllStudents = catchAsync(async (req, res, next)=>{
    const students = await Student.find().populate('department', 'name');
    res.status(200).json({
        status: 'success',
        students,
    });

})

// get students by department
exports.getStudentsByDepartment = catchAsync(async (req, res, next)=>{
    const departmentName = req.params.name
    const department = await Department.findOne({ name: departmentName }).populate({
        path: 'students',
        populate: { path: 'department', select: 'name' }
    });
    if(!department){
        return next (new ErrorHandler('Department not founded',404))
    }
    const students = department.students
    if (!students || students.length === 0) {
        return next(new ErrorHandler('No students found for the department', 404));
    }
    res.status(201).json({
        status: 'success',
        students,
        department:department
    })
})

// get student by studentID
exports.getStudentByID = catchAsync(async (req, res, next)=>{
    const studentID = req.params.studentID
    const student = await Student.findOne({studentID: studentID})
    if(!student){
        return next (new ErrorHandler('student not founded',404))
    }
    res.status(200).json({
        status:'success',
        student
    })

})