import {ATHLETE_FETCH_SESSION_HISTORY, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: {sessions: [], total: 0}, status: null};

export default function sessionHistory(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_SESSION_HISTORY + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload ? action.payload.data.payload : state.data, status: FULFILLED});
    }
    case ATHLETE_FETCH_SESSION_HISTORY + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_FETCH_SESSION_HISTORY + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_FETCH_SESSION_HISTORY:
      return initialState;
    default:
      return state;
  }
}
