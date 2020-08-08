import {ATHLETE_FETCH_SESSIONS_COUNT, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: {
  noOfScheduledSessions: 0,
  noOfUnScheduledSessions: 0,
  noOfChangesToManage: 0
}, status: null};

export default function sessionsCount(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_SESSIONS_COUNT + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload ? action.payload.data.payload : state.data, status: FULFILLED});
    }
    case ATHLETE_FETCH_SESSIONS_COUNT + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_FETCH_SESSIONS_COUNT + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_FETCH_SESSIONS_COUNT:
      return initialState;
    default:
      return state;
  }
}
