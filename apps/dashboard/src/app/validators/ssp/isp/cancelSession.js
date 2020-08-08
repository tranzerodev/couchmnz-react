import {notNull} from '../../../validators/common/util';

const validateCancelSession = cancelSession => {
  const validation = {
    reasonId: false,
    message: false
  };

  const {reasonId, message} = cancelSession;

  validation.reasonId = notNull(reasonId);
  validation.message = notNull(message) && message.trim().length > 0;

  validation.valid = validation.reasonId && validation.message;
  return validation;
};

export default validateCancelSession;
