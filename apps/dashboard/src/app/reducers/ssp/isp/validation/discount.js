import {SSP_VALIDATE_DISCOUNT, SSP_DISCOUNT_SUBMIT, RESET_DISCOUNT} from '../../../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const isNumber = x => {
  return notNull(x) && typeof x === 'number';
};
const isPercent = x => {
  return isNumber(x) && x >= 1 && x < 100;
};
let valid = true;
function validateDiscount(discount) {
  const validatedDiscount = {};
  validatedDiscount.name = notNull(discount.name);
  validatedDiscount.numberOfSessions = isNumber(discount.numberOfSessions) && discount.numberOfSessions < 100 && discount.numberOfSessions > 0;
  validatedDiscount.discount = isPercent(discount.discount);
  valid = validatedDiscount.name && validatedDiscount.numberOfSessions && validatedDiscount.discount;
  console.log('Valid', valid);
  return validatedDiscount;
}

const initialState = {
  submitted: false,
  name: false,
  numberOfSessions: false,
  discount: false,
  discountObject: {},
  valid: false
};

const discounts = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_DISCOUNT : {
      const validation = Object.assign({}, state, validateDiscount(state.discountObject ? state.discountObject : {}));
      validation.valid = valid;
      console.log('validateDiscount', validation);
      return validation;
    }
    case SSP_DISCOUNT_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      validation.discountObject = action.data.discount ? action.data.discount : {};
      console.log('validation', validation);
      return validation;
    }
    case RESET_DISCOUNT: return Object.assign({}, initialState);
    default:
      return state;
  }
};

export default discounts;
