import {VALIDATE_BANK_PAYOUT_DETAILS, SSP_BANK_PAYOUT_DETAILS_SUBMIT} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}

function isValidAccountNumber(number) {
  if (Number.isInteger(parseFloat(number)) && number > 0) {
    return true;
  }
  return false;
}

const initialState = {
  submitted: false,
  valid: false,
  holder: false,
  firstName: false,
  lastName: false,
  type: false,
  bank: false,
  routingNumber: {
    required: false,
    number: false
  },
  accountNumber: {
    required: false,
    number: false
  },
  nickName: false
};
const bankPayoutDetails = (state = initialState, action) => {
  switch (action.type) {
    case VALIDATE_BANK_PAYOUT_DETAILS : {
      const data = action.data;
      const validation = Object.assign({}, state);
      validation.accountNumber = {
        required: notNull(data.accountNumber),
        number: isValidAccountNumber(data.accountNumber)
      };
      validation.holder = notNull(data.holder);
      validation.routingNumber = {
        required: notNull(data.routingNumber),
        number: isValidAccountNumber(data.routingNumber)
      };
      validation.firstName = notNull(data.firstName);
      validation.lastName = notNull(data.lastName);
      validation.type = notNull(data.type);
      validation.nickName = notNull(data.nickName);
      validation.bank = notNull(data.bank);
      if (validation.accountNumber.required === true && validation.accountNumber.number === true && validation.holder === true && validation.type === true && validation.routingNumber.number === true && validation.routingNumber.required === true && validation.firstName === true && validation.lastName === true && validation.nickName === true) {
        validation.valid = true;
      } else {
        validation.valid = false;
      }
      return validation;
    }
    case SSP_BANK_PAYOUT_DETAILS_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      console.log(SSP_BANK_PAYOUT_DETAILS_SUBMIT, action.data.status);
      return validation;
    }
    default:
      return state;
  }
};

export default bankPayoutDetails;

