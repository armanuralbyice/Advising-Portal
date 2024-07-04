const mongoose = require('mongoose');

const advisingScheduleSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    advisingSemester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Semester',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});

advisingScheduleSchema.pre('save', function (next) {
    const currentDate = new Date();
    const currentDateTime = currentDate.getTime();
    const startDateTime = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate(), ...this.startTime.split(':')).getTime();
    const endDateTime = new Date(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate(), ...this.endTime.split(':')).getTime();

    this.isActive = currentDateTime >= startDateTime && currentDateTime <= endDateTime;
    next();
});

module.exports = mongoose.model('AdvisingSchedule', advisingScheduleSchema);



