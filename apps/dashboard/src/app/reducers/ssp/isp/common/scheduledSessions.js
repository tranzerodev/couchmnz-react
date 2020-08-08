import {CLEAR_SCHEDULE_SESSIONS, FETCH_SCHEDULE_SESSIONS, FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

const initialState = {data: [], upcomming: [], status: null};

export default function scheduledSessions(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCHEDULE_SESSIONS + FULFILLED: {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, initialState, {status: REJECTED});
      }
      const {upcomming, scheduled} = action.payload.data.payload;

      return Object.assign({}, state, {data: scheduled, upcomming, status: FULFILLED});
    }
    case FETCH_SCHEDULE_SESSIONS + PENDING : return Object.assign({}, initialState, {status: PENDING});
    case FETCH_SCHEDULE_SESSIONS + REJECTED : return Object.assign({}, initialState, {status: REJECTED});
    case CLEAR_SCHEDULE_SESSIONS:
      return initialState;
    default:
      return state;
  }
}
