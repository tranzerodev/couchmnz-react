import {ATHLETE_SCHEDULE_SESSION, FULFILLED, PENDING, REJECTED} from '../../../constants/ActionTypes';

const initialState = {status: '', responseCode: ''};

export default function scheduleSession(state = initialState, action) {
  switch (action.type) {
    case ATHLETE_SCHEDULE_SESSION + FULFILLED: {
      const {responseCode} = action.payload.data;
      if (responseCode > 0) {
        return Object.assign({}, state, {status: REJECTED, responseCode});
      }
      return Object.assign({}, state, {status: FULFILLED, responseCode: ''});
    }
    case ATHLETE_SCHEDULE_SESSION + PENDING: {
      return Object.assign({}, state, {status: PENDING});
    }
    case ATHLETE_SCHEDULE_SESSION + REJECTED: {
      return Object.assign({}, state, {status: REJECTED});
    }
    case ATHLETE_SCHEDULE_SESSION:
      return initialState;
    default:
      return state;
  }
}
