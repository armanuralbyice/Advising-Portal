const AdvisingSchedule = require('./../model/advisingModel/advisingScheduleSchema'); // Update this path

const updateIsActiveField = async () => {
    try {
        const currentDate = new Date();
        const currentDateTime = currentDate.getTime();

        // Find all schedules
        const schedules = await AdvisingSchedule.find();

        for (const schedule of schedules) {
            const startDateTime = new Date(
                schedule.startDate.getFullYear(),
                schedule.startDate.getMonth(),
                schedule.startDate.getDate(),
                ...schedule.startTime.split(':')
            ).getTime();
            const endDateTime = new Date(
                schedule.endDate.getFullYear(),
                schedule.endDate.getMonth(),
                schedule.endDate.getDate(),
                ...schedule.endTime.split(':')
            ).getTime();

            // Update isActive field
            const isActive = currentDateTime >= startDateTime && currentDateTime <= endDateTime;

            if (schedule.isActive !== isActive) {
                schedule.isActive = isActive;
                await schedule.save();
            }
        }

        console.log('Advising schedules updated');
    } catch (error) {
        console.error('Error updating advising schedules', error);
    }
};

module.exports = updateIsActiveField;