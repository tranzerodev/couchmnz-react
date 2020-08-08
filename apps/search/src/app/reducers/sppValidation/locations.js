import {SSP_VALIDATE_TRAINING_LOCATION, SSP_TRAINING_LOCATION_SUBMIT} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
let valid = true;
function validateLocation(location) {
  const validatedLocation = {};
  validatedLocation.title = notNull(location.title);
  validatedLocation.street = notNull(location.street);
  valid = validatedLocation.title && validatedLocation.street;
  console.log('Valid', valid);
  return validatedLocation;
}

const initialState = {
  submitted: false,
  title: false,
  street: false,
  valid: false
};

const locations = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_TRAINING_LOCATION : {
      const validation = Object.assign({}, state, validateLocation(state.location ? state.location : {}));
      validation.valid = valid;
      return validation;
    }
    case SSP_TRAINING_LOCATION_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      validation.location = action.data.location ? action.data.location : {};
      console.log('validation', validation);
      return validation;
    }
    default:
      return state;
  }
};

export default locations;
