import {CLEAR_MANAGE_BOOKINGS, FETCH_MANAGE_BOOKINGS, FULFILLED, PENDING, REJECTED} from '../../../../constants/ActionTypes';

const initialState = {
  data: [],
  total: 0
};

export default function manageBookings(state = initialState, action) {
  switch (action.type) {
    case FETCH_MANAGE_BOOKINGS + FULFILLED: {
      if (action.payload.data.responseCode === 0) {
        const data = action.payload.data.payload;
        const {bookings, total} = data;
        return Object.assign({}, state, {data: bookings, total, status: FULFILLED});
      }

      return Object.assign({}, state, {data: initialState, status: REJECTED});
    }
    case FETCH_MANAGE_BOOKINGS + PENDING : return {data: [], status: PENDING};
    case FETCH_MANAGE_BOOKINGS + REJECTED : return {data: [], status: REJECTED};
    case CLEAR_MANAGE_BOOKINGS:
      return initialState;
    default:
      return state;
  }
}
