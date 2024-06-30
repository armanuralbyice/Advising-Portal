const catchAsyncError = require('../middleware/catchAsyncError')
const Semester = require('../../server/model/semesterModel/semesterSchema')
const ErrorHandler = require('../../server/utils/ErrorHandler')

// create semester
exports.createSemester = catchAsyncError(async (req, res, next) => {
    const { semesterName } = req.body;

    if (!semesterName) {
        return next(new ErrorHandler('Semester name must be required', 400));
    }
    const [season, year] = semesterName.split(' ');
    const existingSemester = await Semester.findOne({ season, year });

    if (existingSemester) {
        return next(new ErrorHandler('Semester already exists', 409));
    }
    try {
        const newSemester = new Semester({
            season,
            year,
        });
        const savedSemester = await newSemester.save();
        res.status(201).json({
            status: 'success',
            message: 'Semester saved successfully.',
            savedSemester,
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(new ErrorHandler('Semester already exists', 409));
        }
        return next(error)
    }
});

// get all semesters
exports.getAllSemester = catchAsyncError(async (req, res) => {
    const semester = await Semester.find()
    res.status(200).json({
        status: 'success',
        semester
    })
})
exports.deleteSemester = catchAsyncError(async (req,res)=>{
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json({
        status: 'success',
        message: 'Semester deleted successfully'
    });
})