const catchAsyncError = require('../middleware/catchAsyncError')
const AdvisingSchedule = require('../../server/model/advisingModel/advisingScheduleSchema')
const ErrorHandler = require('../../server/utils/ErrorHandler')

exports.createAdvisingSchedule = catchAsyncError(async (req, res, next)=>{
    try {
        const { department, advisingSemester, startDate, endDate, startTime, endTime } = req.body;

        // Check for overlapping advising schedules for the same department
        const existingSchedule = await AdvisingSchedule.findOne({
            department,
            $or: [
                // Check if start time and end time overlap with existing schedule
                { $and: [{ startDate: { $lte: startDate } }, { endDate: { $gte: startDate } }, { startTime: { $lte: startTime } }, { endTime: { $gte: startTime } }] },
                { $and: [{ startDate: { $lte: endDate } }, { endDate: { $gte: endDate } }, { startTime: { $lte: endTime } }, { endTime: { $gte: endTime } }] },
                { $and: [{ startDate: { $gte: startDate } }, { endDate: { $lte: endDate } }, { startTime: { $gte: startTime } }, { endTime: { $lte: endTime } }] },
            ],
        });

        if (existingSchedule) {
            return next (new ErrorHandler('An advising schedule for the same department already exists within the given time range.',400))
        }

        const advisingSchedule = new AdvisingSchedule({
            department,
            advisingSemester,
            startDate,
            endDate,
            startTime,
            endTime,
        });

        const savedSchedule = await advisingSchedule.save();

        res.status(201).json({ success: true, advisingSchedule: savedSchedule });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
})