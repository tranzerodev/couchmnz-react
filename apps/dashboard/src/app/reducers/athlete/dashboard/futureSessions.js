import {ATHLETE_FETCH_FUTURE_SESSIONS, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function futureSessions(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_FUTURE_SESSIONS + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, status: FULFILLED});
    }
    case ATHLETE_FETCH_FUTURE_SESSIONS + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_FETCH_FUTURE_SESSIONS + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_FETCH_FUTURE_SESSIONS:
      return initialState;
    default:
      return state;
  }
}
