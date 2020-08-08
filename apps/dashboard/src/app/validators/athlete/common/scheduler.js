import appConstants from '../../../constants/appConstants.js';
const {athleteScheduler} = appConstants;
const {schedule} = athleteScheduler.errorCodes;

export const isRescheduleError = responseCode => {
  const index = schedule.indexOf(responseCode);
  if (index > -1) {
    return true;
  }
  return false;
};
