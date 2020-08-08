import {PENDING, FETCH_SHOPPING_CART_TAX_SUMMARY, FULFILLED, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  data: [],
  status: null

};
const taxSummary = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHOPPING_CART_TAX_SUMMARY + PENDING : {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_SHOPPING_CART_TAX_SUMMARY + FULFILLED : {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      const data = action.payload.data.payload;
      return Object.assign({}, state, {status: FULFILLED, data});
    }
    case FETCH_SHOPPING_CART_TAX_SUMMARY + REJECTED : {
      return Object.assign({}, state, {status: REJECTED});
    }
    default:
      return state;
  }
};

export default taxSummary;

