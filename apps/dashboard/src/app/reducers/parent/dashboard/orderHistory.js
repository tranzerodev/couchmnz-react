import {FETCH_PARENT_ORDER_HISTORY, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {
  data: {
    orders: []
  },
  status: null
};

export default function orderHistory(state = initialState, action) {
  switch (action.type) {
    case FETCH_PARENT_ORDER_HISTORY + FULFILLED: {
      let orderHistory = {};
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {data: [], status: REJECTED});
      }
      orderHistory = Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
      return orderHistory;
    }
    case FETCH_PARENT_ORDER_HISTORY + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case FETCH_PARENT_ORDER_HISTORY + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case FETCH_PARENT_ORDER_HISTORY:
      return initialState;
    default:
      return state;
  }
}
