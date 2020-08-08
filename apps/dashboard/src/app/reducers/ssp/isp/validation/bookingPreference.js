import {SSP_VALIDATE_BOOKING_PREFERENCE, SSP_BOOKING_PREFERENCE_SUBMIT} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const initialState = {
  submitted: false,
  valid: false,
  bookingPreference: false,
  cancellationPolicy: false
};
const bookingPreferences = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_BOOKING_PREFERENCE : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.bookingPreference = notNull(data.bookingPreferences);
      validation.cancellationPolicy = notNull(data.cancellationPolicy);
      if (validation.bookingPreference === true && validation.cancellationPolicy === true ) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_BOOKING_PREFERENCE_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default bookingPreferences;

