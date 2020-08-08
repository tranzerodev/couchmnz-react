import {SSP_VALIDATE_TRAVEL_PREFERENCE, SSP_TRAVEL_PREFERENCE_SUBMIT} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: false,
  willingToTravel: false,
  distance: false,
  travelAddress: false
};
const travelPreferences = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_TRAVEL_PREFERENCE : {
      const data = action.data;
      const validation = Object.assign({}, state);
      console.log('data', data.travelPreferences);
      validation.willingToTravel = Boolean(data.travelPreferences.willingToTravel && (data.travelPreferences.willingToTravel === 'Y' || data.travelPreferences.willingToTravel === 'N'));
      validation.distance = notNull(data.travelPreferences.distance) && !isNaN(data.travelPreferences.distance);
      validation.travelAddress = notNull(data.travelPreferences.travelAddress ? data.travelPreferences.travelAddress : '');
      if (validation.willingToTravel === true) { /* Validation.distance === true && validation.travelAddress === true */
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_TRAVEL_PREFERENCE_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default travelPreferences;
