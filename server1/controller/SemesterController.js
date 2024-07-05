const Semester = require('../model/semesterSchema')

// create semester
exports.createSemester = async (req, res, next) => {
    const { semesterName } = req.body;

    if (!semesterName) {
        // return next(new ErrorHandler('Semester name must be required', 400));
        res.status(400).send({
            message: 'Semester name is required',
        })
    }

    const [season, year] = semesterName.split(' ');
    const existingSemester = await Semester.findOne({ season, year });

    if (existingSemester) {
        // return next(new ErrorHandler('Semester already exists', 409));
        res.status(409).json({
            message: 'Semester already exists',
        })
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
            // return next(new ErrorHandler('Semester already exists', 409));
            res.status(409).json({
                message: 'Semester already exists',
            })
        }
        return error;
    }
};


// get all semesters
exports.getAllSemester = (async (req, res, next) => {
    const semester = await Semester.find()
    res.status(200).json({
        status: 'success',
        semester
    })
})
exports.deleteSemester = (async (req, res, nest) => {
    const semester = await Semester.findByIdAndDelete(req.params.id);
    if (!semester) {
        return res.status(404).json({ message: 'Semester not found' });
    }
    res.status(200).json({
        status: 'success',
        message: 'Semester deleted successfully'
    });
})