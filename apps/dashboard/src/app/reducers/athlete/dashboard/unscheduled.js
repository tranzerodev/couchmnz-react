import {ATHLETE_FETCH_UNSCHEDULE_SESSION, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function unscheduledSessions(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_UNSCHEDULE_SESSION + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {data: [], status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload ? action.payload.data.payload : state.data, status: FULFILLED});
    }
    case ATHLETE_FETCH_UNSCHEDULE_SESSION + PENDING: {
      return {data: [], status: PENDING};
    }
    case ATHLETE_FETCH_UNSCHEDULE_SESSION + REJECTED: {
      return {data: [], status: REJECTED};
    }
    case ATHLETE_FETCH_UNSCHEDULE_SESSION:
      return initialState;
    default:
      return state;
  }
}
