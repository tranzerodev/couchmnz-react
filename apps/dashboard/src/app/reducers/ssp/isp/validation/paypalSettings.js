import {SSP_VALIDATE_PAYPAL_SETTINGS, SSP_PAYPAL_SETTINGS_SUBMIT} from '../../../../constants/ActionTypes';
import config from '../../../../config';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

const initialState = {
  submitted: false,
  valid: false,
  email: {
    required: false,
    email: false
  }
};
const bankPayoutDetails = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_PAYPAL_SETTINGS : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.email = {
        required: notNull(data.email),
        email: notNull(data.email) && config.RegExp.Email.test(data.email.toLowerCase())
      };
      if (validation.email.required === true && validation.email.email === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_PAYPAL_SETTINGS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default bankPayoutDetails;

