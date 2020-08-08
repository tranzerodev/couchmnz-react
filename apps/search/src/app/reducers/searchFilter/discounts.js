
import {FETCH_DISCOUNT_RATES, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {
  discount: 0, status: null
};

export default function discounts(state = initialState, action) {
  switch (action.type) {
    case FETCH_DISCOUNT_RATES + FULFILLED: {
      const discount = action.payload.data.payload.discount;
      const newStatus = Object.assign({}, state, {discount, status: FULFILLED});
      return newStatus;
    }
    case FETCH_DISCOUNT_RATES + PENDING: {
      const newStatus = Object.assign({}, initialState, {status: PENDING});
      return newStatus;
    }
    case FETCH_DISCOUNT_RATES + REJECTED: {
      const newStatus = Object.assign({}, initialState, {status: REJECTED});
      return newStatus;
    }
    default:
      return state;
  }
}
