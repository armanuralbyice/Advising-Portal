const mongoose = require('mongoose');
const OfferCourse = require('./../courseModel/offerCourseSchema'); // Import the OfferCourse model

const courseEnrollSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    semester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester', // Reference the Semester model
        required: true,
    },
    courses: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OfferCourse',
            },
            marks: {
                mid1: {
                    type: Number,
                    default: 0,
                },
                mid2: {
                    type: Number,
                    default: 0,
                },
                final: {
                    type: Number,
                    default: 0,
                },
                assignment: {
                    type: Number,
                    default: 0,
                }
            }
        }
    ]
});

// Middleware to decrement available seats when a course is enrolled
courseEnrollSchema.pre('save', async function(next) {
    try {
        // Loop through each course enrolled
        for (const enrolledCourse of this.courses) {
            const course = await OfferCourse.findById(enrolledCourse.course);
            if (course) {
                // Decrease available seats by 1
                course.seat--;
                await course.save();
            }
        }
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('CourseEnroll', courseEnrollSchema);
