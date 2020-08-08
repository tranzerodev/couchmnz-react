import {SSP_VALIDATE_TRAINING_LOCATIONS, SSP_TRAINING_LOCATIONS_SUBMIT} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
let valid = true;
function validateLocation(locations) {
  const validatedLocations = locations.map(location => {
    const title = notNull(location.title);
    const country = notNull(location.countryID) && notNull(location.countryName);
    const street = notNull(location.street);
    const valid = title && street && country;
    return valid;
  });
  return validatedLocations;
}

const initialState = {
  submitted: false,
  valid: false,
  locations: []
};

const locations = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_TRAINING_LOCATIONS : {
      console.log('SSP_VALIDATE_TRAINING_LOCATIONS', action.data);
      const validation = Object.assign({}, state);
      validation.locations = validateLocation(action.data && action.data.data ? action.data.data : []);
      valid = validation.locations.length >= 1 && validation.locations.every(x => x);
      validation.valid = valid;
      return validation;
    }
    case SSP_TRAINING_LOCATIONS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default locations;
