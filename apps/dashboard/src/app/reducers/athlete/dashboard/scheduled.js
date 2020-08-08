import {ATHLETE_FETCH_SCHEDULED_SESSIONS, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: [], status: null, responseCode: null, developerMessage: null};

export default function scheduledSessions(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_SCHEDULED_SESSIONS + FULFILLED: {
      const {responseCode, payload, developerMessage} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {data: [], status: REJECTED, responseCode, developerMessage});
      }
      return Object.assign({}, state, {data: payload ? payload : state.data, status: FULFILLED, responseCode: null, developerMessage: null});
    }
    case ATHLETE_FETCH_SCHEDULED_SESSIONS + PENDING: {
      return {data: [], status: PENDING};
    }
    case ATHLETE_FETCH_SCHEDULED_SESSIONS + REJECTED: {
      return {data: [], status: REJECTED};
    }
    case ATHLETE_FETCH_SCHEDULED_SESSIONS:
      return initialState;
    default:
      return state;
  }
}
