const OfferCourseDetails = require('../../model/courseModel/offerCourseDetailsSchema');
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

        // Check if department exists
        const departmentExists = await Department.findById(department);
        if (!departmentExists) {
            return next(new ErrorHandler('No such department found', 404));
        }

        // Save individual OfferCourse documents
        const savedOfferCourses = [];
        const skippedCourses = [];

        for (let courseData of courses) {
            // Check if a course with the same section already exists
            const existingCourse = await OfferCourse.findOne({
                department,
                semester,
                section: courseData.section
            });

            if (!existingCourse) {
                // If no existing course found, create and save the offer course
                const newOfferCourse = new OfferCourse({
                    ...courseData,
                    semester,
                    department
                });
                savedOfferCourses.push(await newOfferCourse.save());
            } else {
                // If course with the same section already exists, skip saving
                skippedCourses.push(courseData.courseName);
                savedOfferCourses.push(existingCourse); // Push existing course to savedOfferCourses
            }
        }

        // Get IDs of the saved OfferCourse documents
        const savedOfferCourseIds = savedOfferCourses.map(course => course._id);

        // Create or update OfferCourseDetails
        let offerCourseDetails = await OfferCourseDetails.findOne({ department, semester });

        if (!offerCourseDetails) {
            // If no offerCourseDetails document exists, create a new one
            offerCourseDetails = new OfferCourseDetails({
                semester,
                department,
                courses: savedOfferCourseIds
            });
        } else {
            // If offerCourseDetails document exists, add new course IDs
            offerCourseDetails.courses.push(...savedOfferCourseIds);
        }

        // Save the offerCourseDetails document
        await offerCourseDetails.save();

        // Update semester document by pushing the new offer course's ID if it's newly created
        await Semester.findByIdAndUpdate(
            semester,
            { $addToSet: { offerCourses: offerCourseDetails._id } },
            { new: true }
        );

        // Prepare success message
        let message = 'All courses added successfully';
        if (skippedCourses.length > 0) {
            message = `Some courses were skipped as they already exist: ${skippedCourses.join(', ')}`;
        }

        // Respond with success message and saved offer courses
        res.status(200).json({
            status: 'success',
            data: {
                offerCourseDetails
            },
            message
        });

    } catch (error) {
        console.error('Error in offerCourses:', error);
        return next(new ErrorHandler('Internal Server Error', 500));
    }
});

exports.getOfferCourses = catchAsync(async (req, res, next) => {
    const {semesterId, departmentId} = req.query;
    const offerCourseDetails = await OfferCourseDetails.findOne({
        semester: semesterId,
        department: departmentId
    }).populate({
        path: 'courses',
        populate: [
            { path: 'courseName', select:'courseCode' },
            { path: 'facultyName', select: 'name' },
            { path: 'classRoom', select: 'building classroomNo' },
            { path: 'labRoom', select: 'building classroomNo' },
        ]
    })

    if (!offerCourseDetails) {
        return next(new ErrorHandler('No course details found for the specified semester and department', 404));
    }

    res.status(200).json({
        success: true,
        courses: offerCourseDetails.courses
    });
})
exports.deleteOfferCourse = catchAsync(async (req, res, next) => {
    const { departmentId, semesterId, courseId } = req.query;

    try {
        const updatedOfferCourseDetails = await OfferCourseDetails.findOneAndUpdate(
            {
                semester: semesterId,
                department: departmentId
            },
            {
                $pull: { courses: courseId }
            },
            { new: true }
        );

        if (updatedOfferCourseDetails) {
            const deletedOfferCourse = await OfferCourse.findByIdAndDelete(courseId)

            if (!deletedOfferCourse) {
                return next (new ErrorHandler(`No OfferCourse document found with ID: ${courseId}`, 200))
            }
        }
        else {
            console.log(`No OfferCourseDetails document found for department ${departmentId} and semester ${semesterId}`);
        }

        res.status(200).json({
            status: 'success',
            message: 'Delete successfully'
        });
    } catch (error) {
        console.error('Error deleting offer course:', error);
        res.status(500).json({
            status: 'error',
            message: 'An error occurred while deleting the offer course'
        });
    }
});

