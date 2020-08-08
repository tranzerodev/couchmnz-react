import {notNull} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';

const validateOpenPositions = totalSlots => {
  const validation = {
    totalSlots: false,
    buffer: false
  };

  validation.totalSlots = notNull(totalSlots) && totalSlots >= appConstants.profileSession.totalSlots.min && totalSlots % appConstants.profileSession.totalSlots.step === 0;

  validation.valid = validation.totalSlots;
  return validation;
};

export default validateOpenPositions;
