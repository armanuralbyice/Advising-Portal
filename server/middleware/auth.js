const jwt = require('jsonwebtoken');
const catchAsync = require('./catchAsyncError');
const Student = require('../model/studentModel/studentSchema');
const Faculty = require('../model/facultyModel/facultySchema');
const Admin = require('../model/adminModel/adminSchema');
const ErrorHandler = require("../utils/ErrorHandler");


exports.authenticateUser = (model) => catchAsync(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Not authorized to access this route, Login first', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await model.findById(decoded.id);

        next();
    }
    catch (error) {
        return next(new ErrorHandler('Invalid token', 401));
    }
});

exports.authorizeUserRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler('Not authorized to access this route', 401));
    }

    next();
};


exports.authenticateStudent = exports.authenticateUser(Student);
exports.authorizeStudentRoles = exports.authorizeUserRoles('student');


exports.authenticateRegister = exports.authenticateUser(Admin);
exports.authorizeRegisterRoles = exports.authorizeUserRoles('admin');


exports.authenticateFaculty = exports.authenticateUser(Faculty);
exports.authorizeFacultyRoles = exports.authorizeUserRoles('faculty');
