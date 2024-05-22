const OfferCourse = require('../../model/courseModel/offerCourseSchema');
const Semester = require('../../model/semesterModel/semesterSchema');
const Department = require('../../model/departmentModel/departmentSchema');
const ErrorHandler = require('../../utils/ErrorHandler');
const catchAsync = require('../../middleware/catchAsyncError');

exports.offerCourse = catchAsync(async (req, res, next) => {
    const { semester, department, courses } = req.body;

    try {
        // Check if semester exists
        const semesterExists = await Semester.findById(semester);
        if (!semesterExists) {
            return next(new ErrorHandler('No such semester found', 404));
        }

        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            return next(new ErrorHandler('No such department found', 404));
        }

        // Find the offerCourse document for the given department and semester
        let offerCourse = await OfferCourse.findOne({ department, semester });

        // Initialize an array to hold new courses
        let newCourses = [];
        let existingCourses = [];

        if (offerCourse) {
            for (let course of courses) {
                // Check if the courseName already exists in the courses array of offerCourse
                if (offerCourse.courses.some(c => c.courseName.equals(course.courseName))) {
                    existingCourses.push(course.courseName); // Collect existing courses
                } else {
                    newCourses.push(course);
                }
            }
        } else {
            newCourses = courses;
        }

        if (!offerCourse) {
            // If no offerCourse document exists, create a new one
            offerCourse = new OfferCourse({
                semester,
                department,
                courses: newCourses
            });
        } else {
            // If offerCourse document exists, add new courses
            offerCourse.courses.push(...newCourses);
        }

        // Save the offerCourse document
        await offerCourse.save();

        // Update semester document by pushing the new offer course's ID if it's newly created
        await Semester.findByIdAndUpdate(
            semester,
            { $addToSet: { offerCourses: offerCourse._id } },
            { new: true }
        );

        // Respond with success message and saved offer course, and notify about existing courses
        res.status(200).json({
            status: 'success',
            data: {
                offerCourse,
                existingCourses
            },
            message: existingCourses.length > 0 ? `Courses already exist: ${existingCourses.join(', ')}` : 'All courses added successfully'
        });

    } catch (error) {
        console.error('Error in offerCourses:', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
});




exports.deleteOfferCourse = catchAsync(async (req, res, next)=>{
    const offerCourseID = req.params.id;
    const offerCourse = await OfferCourse.findOne({offerCourseID})
    if(!offerCourse){
        return next(new ErrorHandler('No such course found', 400));
    }
    const associatedSemester = await Semester.findOne({offerCourses: offerCourse._id})
    if(associatedSemester){
        await Semester.findByIdAndUpdate(
            associatedSemester._id,
            {$pull: {offerCourses: offerCourse._id}},
            {new: true}
        )
    }
    await OfferCourse.findByIdAndDelete(offerCourse._id)
    res.status(200).json({
        status: 'success',
        message: 'Delete successfully'
    })
})