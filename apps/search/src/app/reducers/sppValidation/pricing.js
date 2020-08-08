import {SSP_VALIDATE_PRICING, SSP_PRICING_SUBMIT, SSP_VALIDATE_MULTIPLE_PRICING, RESET_PRICING} from '../../constants/ActionTypes';
function notNull(object) {
  if (object === undefined || object === null || object === '') {
    return false;
  }
  return true;
}
const isNumber = x => {
  return notNull(x) && !isNaN(x);
};
const isPercent = x => {
  return isNumber(x) && x >= 1 && x < 100;
};

const filterClone = x => x;

let valid = false;

const validateIndividualPricing = prices => {
  console.log('prices', prices);
  const validatedPricing = {};
  validatedPricing.prices = prices.map(price => isNumber(price.price) && price.price >= 1);
  valid = validatedPricing.prices.every(filterClone);
  // Console.log('Valid', valid);
  return validatedPricing;
};

const validatePricing = prices => {
  console.log('prices', prices);
  const validatedPricing = {};
  validatedPricing.prices = prices.map(price => isNumber(price.price) && price.price >= 1);
  validatedPricing.min = prices.map(price => isNumber(price.min) && price.min >= 1);
  validatedPricing.max = prices.map(price => isNumber(price.max) && price.max >= 1);
  valid = validatedPricing.prices.every(filterClone) && validatedPricing.min.every(filterClone) && validatedPricing.max.every(filterClone);
  // Console.log('Valid', valid);
  return validatedPricing;
};

const initialState = {
  submitted: false,
  // Price: false,
  prices: [],
  min: [],
  max: [],
  valid: false
};

const discounts = (state = initialState, action) => {
  switch (action.type) {
    case SSP_VALIDATE_PRICING : {
      const validation = Object.assign({}, state, validateIndividualPricing(action.data && action.data.prices ? action.data.prices : []));
      // Const validation = Object.assign({}, state, validatePricing(action.data.prices));
      validation.valid = valid;
      return validation;
    }
    case SSP_VALIDATE_MULTIPLE_PRICING : {
      const validation = Object.assign({}, state, validatePricing(action.data.prices));
      validation.valid = valid;
      return validation;
    }
    case SSP_PRICING_SUBMIT : {
      const validation = Object.assign({}, state);
      validation.submitted = action.data.status;
      return validation;
    }
    case RESET_PRICING: return Object.assign({}, initialState);
    default: return state;
  }
};

export default discounts;
