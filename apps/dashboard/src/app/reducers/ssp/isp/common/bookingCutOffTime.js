import {SAVE_BOOKING_PREFERENCE, SET_BOOKING_CUT_OFF_TIME} from '../../../../constants/ActionTypes';

const initialState = null;

export default function bookingCutOffTime(state = initialState, action) {
  switch (action.type) {
    case SAVE_BOOKING_PREFERENCE: {
      const {bookingCutOffTime} = action;
      return bookingCutOffTime;
    }
    case SET_BOOKING_CUT_OFF_TIME: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
