import appConstants from '../../../../constants/appConstants';

export function notNull(value) {
  if (value === undefined || value === null || value === '') {
    return false;
  }
  return true;
}

export function validateSession(session) {
  const validatedSession = {};
  validatedSession.name = notNull(session.name);
  validatedSession.subSSPType = notNull(session.subSSPTypeID) && notNull(session.subSSPTypeName);
  validatedSession.gender = notNull(session.gender);
  validatedSession.ageGroup = notNull(session.ageGroupID) && notNull(session.ageGroupName);
  validatedSession.skillLevel = notNull(session.skillLevelID) && notNull(session.skillLevelName);
  validatedSession.defaultSessionLength = notNull(session.defaultSessionLength) && session.defaultSessionLength >= appConstants.profileSession.session.min && session.defaultSessionLength % appConstants.profileSession.session.step === 0;
  validatedSession.bufferBetweenSession = notNull(session.bufferBetweenSession) && session.bufferBetweenSession >= appConstants.profileSession.buffer.min && session.bufferBetweenSession % appConstants.profileSession.buffer.step === 0;
  validatedSession.isSpecificNumberOfSessions = notNull(session.isSpecificNumberOfSessions);
  validatedSession.numberOfSessions = notNull(session.numberOfSessions);
  validatedSession.location = (notNull(session.trainingLocationID));
  validatedSession.groupSize = (notNull(session.subSSPTypeBaseRateID));
  validatedSession.valid = validatedSession.name && validatedSession.subSSPType && validatedSession.gender && validatedSession.ageGroup && validatedSession.skillLevel && validatedSession.defaultSessionLength &&
    validatedSession.bufferBetweenSession && validatedSession.location && (validatedSession.groupSize || ((validatedSession.subSSPType && session.subSSPTypeName !== 'Team Training') &&
      (validatedSession.subSSPType && session.subSSPTypeName !== 'Group Training') && (validatedSession.subSSPType && session.subSSPTypeName !== 'Clinics')));
  return validatedSession;
}
