import {ATHLETE_CANCEL_SESSION, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {status: null};

export default function cancelSession(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_CANCEL_SESSION + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ATHLETE_CANCEL_SESSION + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_CANCEL_SESSION + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_CANCEL_SESSION:
      return initialState;
    default:
      return state;
  }
}
