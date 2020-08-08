import {notNull, isValidDate} from '../../../validators/common/util';

const rescheduleSession = (rescheduleSession, {openSlots, totalSlots}) => {
  const validation = {
    startDate: false,
    sessionSlotIndex: false,
    reasonId: false,
    message: false
  };

  const {startDate, sessionSlotIndex, reasonId, message} = rescheduleSession;
  validation.startDate = isValidDate(startDate);
  validation.sessionSlotIndex = notNull(sessionSlotIndex);
  validation.reasonId = openSlots === totalSlots ? true : notNull(reasonId);
  validation.message = openSlots === totalSlots ? true : (notNull(message) && message.trim().length > 0);

  validation.valid = validation.startDate &&
  validation.sessionSlotIndex &&
    validation.reasonId &&
    validation.message;
  return validation;
};

export default rescheduleSession;
