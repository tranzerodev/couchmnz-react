import {notNull} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';

const validateSessionBuffer = sessionBuffer => {
  const validation = {
    buffer: false
  };

  validation.sessionBuffer = notNull(sessionBuffer) && sessionBuffer >= appConstants.profileSession.buffer.min && sessionBuffer % appConstants.profileSession.buffer.step === 0;

  validation.valid = validation.sessionBuffer;
  return validation;
};

export default validateSessionBuffer;
