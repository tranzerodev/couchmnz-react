import {SSP_VALIDATE_SESSION, SSP_SESSION_SUBMIT, CLEAR_SESSION_VALIDATION} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const valid = true;
function validateSession(session) {
  const validatedSession = {};
  validatedSession.name = notNull(session.name);
  validatedSession.subSSPType = notNull(session.subSSPTypeID) && notNull(session.subSSPTypeName);
  validatedSession.gender = notNull(session.gender);
  validatedSession.ageGroup = notNull(session.ageGroupID) && notNull(session.ageGroupName);
  validatedSession.skillLevel = notNull(session.skillLevelID) && notNull(session.skillLevelName);
  validatedSession.defaultSessionLength = notNull(session.defaultSessionLength);
  validatedSession.bufferBetweenSession = notNull(session.bufferBetweenSession);
  validatedSession.isSpecificNumberOfSessions = notNull(session.isSpecificNumberOfSessions);
  validatedSession.numberOfSessions = notNull(session.numberOfSessions);
  validatedSession.location = (notNull(session.trainingLocationID));
  validatedSession.groupSize = (notNull(session.subSSPTypeBaseRateID));
  // ValidatedSession.overridePricing = notNull(session.overridePricing);
  // ValidatedSession.calendarLabel = notNull(validatedSession.calendarLabel);
  validatedSession.valid = validatedSession.name && validatedSession.subSSPType && validatedSession.gender && validatedSession.ageGroup && validatedSession.skillLevel &&
    validatedSession.bufferBetweenSession && validatedSession.location && (validatedSession.groupSize || ((validatedSession.subSSPType && session.subSSPTypeName !== 'Team Training') &&
      (validatedSession.subSSPType && session.subSSPTypeName !== 'Group Training')));
  console.log('Valid', valid);
  return validatedSession;
}

const initialState = {
  submitted: false,
  valid: false,
  name: false,

  subSSPType: false,

  gender: false,

  ageGroup: false,

  skillLevel: false,

  calendarLabel: false,
  defaultSessionLength: false,
  bufferBetweenSession: false,
  isSpecificNumberOfSessions: false,
  numberOfSessions: false,
  overridePricing: false,
  location: false
};

const sessions = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_SESSION : {
      console.log('SSP_VALIDATE_SESSION', 'action', action, 'state', state);
      const validation = Object.assign({}, {...validateSession(action.data ? action.data : {}), submitted: state.submitted});
      return validation;
    }
    case SSP_SESSION_SUBMIT : {
      const validation = Object.assign({}, state);
      console.log('SSP_SESSION_SUBMIT', 'action', action, 'state', state);
      validation.submitted = action.data.status;
      return validation;
    }
    case CLEAR_SESSION_VALIDATION:
      return initialState;
    default:
      return state;
  }
};

export default sessions;
