const mongoose = require('mongoose');
const CourseEnroll = require('../../model/courseModel/courseEnrollSchema');
const Student = require('../../model/studentModel/studentSchema');
const Semester = require('../../model/semesterModel/semesterSchema');
const OfferCourse = require('../../model/courseModel/offerCourseSchema');
const ErrorHandler = require('../../utils/ErrorHandler');
const catchAsync = require('../../middleware/catchAsyncError');

// student course enroll.
exports.enrollCourse = catchAsync(async (req, res, next) => {
    const { studentId, courseId } = req.body;

    // Ensure courseId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return next(new ErrorHandler('Invalid courseId ObjectId', 400));
    }

    try {
        const lastSemester = await Semester.findOne().sort({ createdAt: -1 }).exec();
        if (!lastSemester) {
            return next(new ErrorHandler('No semester found', 404));
        }

        const offerCourseForSemester = await OfferCourse.findOne({ semester: lastSemester._id });
        if (!offerCourseForSemester) {
            return next(new ErrorHandler('No offered courses found for the current semester', 404));
        }

        const student = await Student.findById(studentId);
        if (!student) {
            return next(new ErrorHandler('Student not found', 404));
        }

        const departmentOfferCourses = await OfferCourse.findOne({ department: student.department });
        if (!departmentOfferCourses) {
            return next(new ErrorHandler('No courses offered for the student’s department', 404));
        }

        const existingEnrollment = await CourseEnroll.findOne({ student: student._id });
        const offerCourse = await OfferCourse.findOne({ 'courses._id': courseId });

        if (!offerCourse) {
            return next(new ErrorHandler('OfferCourse document not found', 404));
        }

        const course = offerCourse.courses.id(courseId);
        if (!course) {
            return next(new ErrorHandler('Course not found in OfferCourse document', 404));
        }

        if (existingEnrollment) {
            if (existingEnrollment.semester.equals(lastSemester._id)) {
                if (existingEnrollment.courses.some(enrolledCourse => enrolledCourse.course.equals(course._id))) {
                    return next(new ErrorHandler('Course already enrolled', 400));
                } else {
                    existingEnrollment.courses.push({ course: course._id });
                    await existingEnrollment.save();
                    return res.status(200).json({ message: 'Course added to existing enrollment', enrollCourse: existingEnrollment });
                }
            } else {
                // Create new enrollment because the semester does not match
                const newEnrollment = new CourseEnroll({
                    student: studentId,
                    semester: lastSemester._id,
                    courses: [{ course: course._id }]
                });
                await newEnrollment.save();
                return res.status(200).json({ message: 'New enrollment created due to semester change', enrollCourse: newEnrollment });
            }
        } else {
            // No existing enrollment found, create a new one
            const newEnrollment = new CourseEnroll({
                student: studentId,
                semester: lastSemester._id,
                courses: [{ course: course._id }]
            });
            await newEnrollment.save();
            return res.status(200).json({ enrollCourse: newEnrollment });
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// faculty course enroll
exports.facultyCourseListBySemester = catchAsync(async (req, res, next) => {
    const { facultyId } = req.body;
    const {semesterId} = req.params
    try{
        const findSemester = await OfferCourse.findOne({ 'semester': semesterId }).populate('courses.courseName','courseCode');

        if (findSemester) {
            // Convert facultyId to ObjectId
            const facultyObjectId = new mongoose.Types.ObjectId(facultyId);
            // Filter courses by facultyId
            const courses = findSemester.courses.filter(course => course.facultyName.equals(facultyObjectId));

            if (courses.length > 0) {
                res.status(200).json({
                    courseNames: courses
                });
            } else {
                return next(new ErrorHandler('No courses found for the given faculty in this semester', 404));
            }
        } else {
            return next(new ErrorHandler('Semester not found', 404));
        }
    }catch (err){
        return next(new ErrorHandler(err.message, 500));
    }
});

exports.facultyEnrollCoursesStudentList = catchAsync(async (req, res, next) => {
    try {
        const enrollCourse = await CourseEnroll.find().populate('courses','course');
        res.status(200).json({
            enrollCourse
        });
    } catch (error) {
        console.error('Error:', error); // Log any errors that occur
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});


