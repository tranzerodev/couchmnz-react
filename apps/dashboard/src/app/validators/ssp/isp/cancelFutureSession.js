import {notNull} from '../../../validators/common/util';

const cancelFutureSession = cancelFutureSessionsData => {
  const validation = {
    reasonId: false,
    sessions: false
  };

  const {reasonId, sessions} = cancelFutureSessionsData;

  validation.reasonId = notNull(reasonId);
  validation.sessions = notNull(sessions) && (sessions.length > 0);

  validation.valid = (validation.reasonId === true) && (validation.sessions === true);
  return validation;
};

export default cancelFutureSession;

