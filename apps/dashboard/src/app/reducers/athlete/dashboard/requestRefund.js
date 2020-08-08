import {ATHLETE_REQUEST_REFUND, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {status: null};

export default function requestRefund(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_REQUEST_REFUND + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ATHLETE_REQUEST_REFUND + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_REQUEST_REFUND + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_REQUEST_REFUND:
      return initialState;
    default:
      return state;
  }
}
