import {SSP_VALIDATE_SESSION_NAME, SSP_SESSION_NAME_SUBMIT} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: false,
  sessionName: false
};
const sessionName = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_SESSION_NAME : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.sessionName = notNull(data.sessionName);
      if (validation.sessionName === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_SESSION_NAME_SUBMIT : {
      console.log('SSP_SESSION_NAME_SUBMIT', 'state', state, 'data', action.data);
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default sessionName;

