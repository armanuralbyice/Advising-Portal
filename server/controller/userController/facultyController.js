const Faculty = require('../../model/facultyModel/facultySchema')
const Department = require('../../model/departmentModel/departmentSchema')
const catchAsync = require('../../middleware/catchAsyncError')
const ErrorHandler = require('../../utils/ErrorHandler')
const { addFacultyAndSendEmail} = require("../../middleware/sendEmail");
const Student = require("../../model/studentModel/studentSchema");

// for add Faculty
exports.addFaculty = catchAsync(async (req, res, next) => {
    const emailExists = await Faculty.findOne({ email: req.body.email });

    if (emailExists) {
        return res.status(400).json({
            success: false,
            message: 'Email already exists.',
        });
    }
    await addFacultyAndSendEmail(req, res, next);
})

// get all faculties
exports.getAllFaculties = catchAsync(async (req, res, next)=>{
    const faculties = await Faculty.find().populate('department', 'name');
    res.status(200).json({
        status: 'success',
        faculties
    })
})

// get faculties by department
exports.getFacultiesByDepartment = catchAsync(async (req, res, next) => {
    let departmentQuery;
    if (req.params.id) {
        departmentQuery = { _id: req.params.id };
    } else if (req.params.name) {
        departmentQuery = { name: req.params.name };
    } else {
        return next(new ErrorHandler('Department ID or name must be provided', 400));
    }

    const department = await Department.findOne({departmentQuery}).populate('faculties');
    if (!department) {
        return next(new ErrorHandler('Department not found', 404));
    }

    const faculties = department.faculties;
    if (!faculties || faculties.length === 0) {
        return next(new ErrorHandler('No faculties found for the department', 404));
    }

    res.status(200).json({
        status: 'success',
        faculties
    });
});


// get faculty by facultyID
exports.getFacultyByID = catchAsync(async(req, res, next)=>{
    const facultyID = req.params.facultyID
    const faculty = await Faculty.findOne({facultyID: facultyID})
    if(!faculty){
        return next (new ErrorHandler('Faculty not founded', 404))
    }
    res.status(200).json({
        status:'success',
        faculty
    })
})