const Faculty = require('../../model/facultyModel/facultySchema');
const Student = require('../../model/studentModel/studentSchema');
const Admin = require('../../model/adminModel/adminSchema');
const ErrorHandler = require('../../utils/ErrorHandler');
const catchAsync = require('../../middleware/catchAsyncError');
const sendToken = require("../../utils/sendToken");
const {compare} = require("bcrypt");


exports.loginUser = catchAsync( async (req, res,next) => {
    const { email, password } = req.body;

    try {
        let user;
        // Query Student collection
        user = await Student.findOne({ email }).select('+password');
        if (user) {
            // Check if password matches
            const isMatch = await compare(password, user.password);
            if (isMatch) {
                return sendToken(user, 200, res);
            }
        }

        // Query Faculty collection
        user = await Faculty.findOne({ email }).select('+password');
        if (user) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
                return sendToken(user, 200, res);
            }
        }

        // Query Admin collection
        user = await Admin.findOne({ email }).select('+password');
        if (user) {
            const isMatch = await compare(password, user.password);
            if (isMatch) {
                return sendToken(user, 200, res);
            }
        }

        // If no user found or password does not match for any user
        return next(new ErrorHandler('Invalid credentials',401))
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

exports.logout = catchAsync(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        message: 'Logged out successfully',
    });
});