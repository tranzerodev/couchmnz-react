import {notNull, isValidDate} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';

const isValidDays = repeatSession => {
  if (repeatSession.frequency === appConstants.RepeatSession.frequency.weekly) {
    return (repeatSession.days.length > 0);
  }
  return true;
};

const validateRepeatSession = repeatSession => {
  const validation = {
    frequency: false,
    endRepeat: false,
    endRepeatTime: false,
    days: false
  };

  validation.frequency = notNull(repeatSession.frequency);
  validation.endRepeatTime = isValidDate(repeatSession.endRepeatTime);
  validation.days = isValidDays(repeatSession);
  validation.endRepeat = notNull(repeatSession.endRepeat);

  validation.valid = validation.frequency === true &&
    validation.endRepeatTime === true &&
    validation.days === true &&
    validation.endRepeat === true;
  return validation;
};

export default validateRepeatSession;
