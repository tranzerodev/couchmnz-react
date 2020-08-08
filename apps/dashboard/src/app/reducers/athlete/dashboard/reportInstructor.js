import {ATHLETE_REPORT_INSTRUCTOR, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {status: null};

export default function reportInstructor(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_REPORT_INSTRUCTOR + FULFILLED: {
      if (action.payload.data.responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED});
      }
      return Object.assign({}, state, {status: FULFILLED});
    }
    case ATHLETE_REPORT_INSTRUCTOR + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_REPORT_INSTRUCTOR + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_REPORT_INSTRUCTOR:
      return initialState;
    default:
      return state;
  }
}
