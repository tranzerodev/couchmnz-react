import {REORDER, FULFILLED, PENDING, REJECTED} from '../../constants/ActionTypes';

const initialState = {status: ''};

export default function order(state = initialState, action) {
  switch (action.type) {
    case REORDER + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case REORDER + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case REORDER + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case REORDER:
      return initialState;
    default:
      return state;
  }
}
