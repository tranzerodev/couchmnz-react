import {CLEAR_SCHEDULE_SESSIONS, FULFILLED, PENDING, REJECTED, CREATE_NEW_SCHEDULED_SESSION} from '../../../../constants/ActionTypes';

const initialState = {data: [], upcomming: [], status: null};

export default function scheduledSessions(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_SCHEDULED_SESSION + PENDING : return Object.assign({}, initialState, {status: PENDING});
    case CREATE_NEW_SCHEDULED_SESSION + FULFILLED : return Object.assign({}, initialState, {status: action.payload.data.responseCode === 0 ? FULFILLED : REJECTED});
    case CREATE_NEW_SCHEDULED_SESSION + REJECTED : return Object.assign({}, initialState, {status: REJECTED});
    case CLEAR_SCHEDULE_SESSIONS:
      return initialState;
    default:
      return state;
  }
}
