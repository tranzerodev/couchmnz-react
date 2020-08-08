import {EXPORT_ORDER_HISTORY, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {status: null};

export default function exportOrderHistory(state = initialState, action) {
  switch (action.type) {
    case EXPORT_ORDER_HISTORY + FULFILLED: {
      return {status: FULFILLED};
    }
    case EXPORT_ORDER_HISTORY + PENDING: {
      return {status: PENDING};
    }
    case EXPORT_ORDER_HISTORY + REJECTED: {
      return {status: REJECTED};
    }
    case EXPORT_ORDER_HISTORY:
      return initialState;
    default:
      return state;
  }
}
