import {ATHLETE_FETCH_SCHEDULE_CHANGES, FULFILLED, PENDING, REJECTED, ATHLETE_HANDLE_BOOKING_CHANGES} from '../../../constants/ActionTypes';

const initialState = {data: [], status: null, actionStatus: null};

export default function scheduleChanges(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_FETCH_SCHEDULE_CHANGES + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {data: [], status: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload ? action.payload.data.payload : state.data, status: FULFILLED});
    }
    case ATHLETE_FETCH_SCHEDULE_CHANGES + PENDING: {
      return Object.assign({}, state, {data: [], status: PENDING});
    }
    case ATHLETE_FETCH_SCHEDULE_CHANGES + REJECTED: {
      return Object.assign({}, state, {data: [], status: REJECTED});
    }
    case ATHLETE_HANDLE_BOOKING_CHANGES + PENDING: {
      return Object.assign({}, state, {actionStatus: PENDING});
    }
    case ATHLETE_HANDLE_BOOKING_CHANGES + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {actionStatus: REJECTED});
      }
      return Object.assign({}, state, {data: action.payload.data.payload, actionStatus: FULFILLED});
    }
    case ATHLETE_FETCH_SCHEDULE_CHANGES:
      return initialState;
    default:
      return state;
  }
}
