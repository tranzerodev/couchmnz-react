import {notNull, isValidDate} from '../../../validators/common/util';

const rescheduleBooking = rescheduleSession => {
  const validation = {
    startDate: false,
    scheduleId: false,
    reasonId: false,
    message: false
  };

  const {startDate, scheduleId, reasonId, message} = rescheduleSession;

  validation.startDate = isValidDate(startDate);
  validation.scheduleId = notNull(scheduleId);
  validation.reasonId = notNull(reasonId);
  validation.message = (notNull(message) && message.trim().length > 0);

  validation.valid = validation.startDate &&
  validation.scheduleId &&
    validation.reasonId &&
    validation.message;
  return validation;
};

export default rescheduleBooking;
