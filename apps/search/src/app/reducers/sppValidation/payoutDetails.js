import {SSP_VALIDATE_PAYOUT_DETAILS, SSP_BANK_PAYOUT_DETAILS_SUBMIT, SSP_PAYOUT_DETAILS_SUBMIT} from '../../constants/ActionTypes';

function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

const initialState = {
  submitted: false,
  valid: false,
  currency: false,
  payoutOption: false
};
const bankPayoutDetails = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_PAYOUT_DETAILS : {
      const data = action.data;
      console.log('VALIDATE', data);
      const validation = Object.assign({}, state);
      validation.currency = notNull(data.currency);
      validation.payoutOption = notNull(data.payoutOption);
      if (validation.currency === true && validation.payoutOption === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_PAYOUT_DETAILS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    default:
      return state;
  }
};

export default bankPayoutDetails;

