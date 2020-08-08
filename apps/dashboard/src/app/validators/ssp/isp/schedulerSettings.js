import {notNull} from '../../../validators/common/util';
import appConstants from '../../../constants/appConstants';
import {validateWorkingDays} from './common/schedulerSettings';

const validateSchedulerSettings = (settings, workingDays) => {
  const validation = {
    sportId: false,
    defaultSessionId: false,
    sessions: [],
    weeks: false
  };

  const {sportId, defaultSessionId, sessions} = settings;
  validation.weeks = validateWorkingDays(workingDays);
  validation.sportId = notNull(sportId);
  validation.defaultSessionId = notNull(defaultSessionId);
  validation.sessions = sessions.map(session => {
    return {
      defaultSessionLength: notNull(session.defaultSessionLength) && session.defaultSessionLength >= appConstants.profileSession.session.min && session.defaultSessionLength % appConstants.profileSession.session.step === 0,
      bufferBetweenSession: notNull(session.bufferBetweenSession) && session.bufferBetweenSession >= appConstants.profileSession.buffer.min && session.bufferBetweenSession % appConstants.profileSession.buffer.step === 0,
      overridePricing: notNull(session.overridePricing) && (session.overridePricing >= 0)
    };
  });
  const validSessions = validation.sessions.every(session => (session.defaultSessionLength === true && session.bufferBetweenSession === true && session.overridePricing === true));
  validation.valid = validation.sportId === true &&
    validation.defaultSessionId === true &&
    validation.weeks === true &&
    validSessions === true;
  return validation;
};

export default validateSchedulerSettings;
