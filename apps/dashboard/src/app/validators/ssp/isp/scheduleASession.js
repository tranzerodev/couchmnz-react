import {notNull, isValidDate} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';
import moment from 'moment';

const validateEndTime = (startTime, endTime) => {
  const result = {required: false, valid: false};
  if (notNull(endTime)) {
    result.required = true;
    const startTimeArray = startTime.split(':');
    const endTimeArray = endTime.split(':');
    const startDateTime = moment().set({h: startTimeArray[0], m: startTimeArray[1]});
    const endDateTime = moment().set({h: endTimeArray[0], m: endTimeArray[1]});
    result.valid = endDateTime.isAfter(startDateTime);
  }
  return result;
};
const validateScheduleASession = newSession => {
  const validation = {
    startDate: false,
    startTime: false,
    endTime: {
      required: false,
      valid: false
    },
    sportId: false,
    sessionId: false,
    totalSlots: false
  };

  const {startDate, startTime, endTime, sportId, sessionId, totalSlots, minSize, maxSize} = newSession;

  validation.startDate = isValidDate(startDate);
  validation.startTime = notNull(startTime);
  validation.endTime = validateEndTime(startTime, endTime);
  validation.sportId = notNull(sportId);
  validation.sessionId = notNull(sessionId);
  validation.totalSlots = notNull(totalSlots) && (totalSlots >= minSize) && (totalSlots <= maxSize);

  validation.valid = validation.startDate &&
    validation.startTime &&
    validation.endTime.valid &&
    validation.sportId &&
    validation.sessionId &&
    validation.totalSlots;
  return validation;
};

export default validateScheduleASession;
