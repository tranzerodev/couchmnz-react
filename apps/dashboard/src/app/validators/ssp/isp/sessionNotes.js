import {notNull} from '../../../validators/common/util';

const validateSessionNotes = sessionNotes => {
  const validation = {
    sessionNotes: false
  };

  validation.sessionNotes = notNull(sessionNotes) && (typeof sessionNotes === 'string') && sessionNotes.trim().length > 0;

  validation.valid = validation.sessionNotes;
  return validation;
};

export default validateSessionNotes;
