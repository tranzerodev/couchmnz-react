import {FULFILLED, PENDING, REJECTED, FETCH_ISP_BOOKING_SCHEDULED_SESSIONS} from '../../../../constants/ActionTypes';

const initialState = {data: [], status: null};

export default function bookingScheduledSessions(state = initialState, action) {
  switch (action.type) {
    case FETCH_ISP_BOOKING_SCHEDULED_SESSIONS + FULFILLED: {
      if (action.payload.data.responseCode >= 100) {
        return Object.assign({}, initialState, {status: REJECTED});
      }
      const data = action.payload.data.payload;

      return Object.assign({}, state, {data, status: FULFILLED});
    }
    case FETCH_ISP_BOOKING_SCHEDULED_SESSIONS + PENDING : return Object.assign({}, initialState, {status: PENDING});
    case FETCH_ISP_BOOKING_SCHEDULED_SESSIONS + REJECTED : return Object.assign({}, initialState, {status: REJECTED});
    case FETCH_ISP_BOOKING_SCHEDULED_SESSIONS:
      return initialState;
    default:
      return state;
  }
}

