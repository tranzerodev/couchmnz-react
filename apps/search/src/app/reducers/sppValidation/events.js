import {SSP_VALIDATE_EVENTS, SSP_SUBMIT_EVENTS} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
let valid = true;
function validateEvent(events) {
  const validatedSession = {};
  console.log(events.length);
  validatedSession.numberOfEvents = notNull(events) && events.length > 0;
  valid = validatedSession.numberOfEvents;
  return validatedSession;
}

const initialState = {
  submitted: false,
  valid: false,
  numberOfEvents: false
};

const events = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_EVENTS : {
      console.log('SSP_VALIDATE_EVENTS', 'state', state, 'action', action);
      const validation = Object.assign({}, state, validateEvent(action.data.events.data));
      validation.valid = valid;
      return validation;
    }
    case SSP_SUBMIT_EVENTS : {
      return Object.assign({}, state, {submitted: action.data.status});
    }
    default:
      return state;
  }
};

export default events;
