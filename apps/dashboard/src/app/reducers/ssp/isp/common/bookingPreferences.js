import {UPDATE_BOOKING_PREFERENCES, CLEAR_BOOKING_PREFERENCES, SET_BOOKING_PREFERENCES, SAVE_BOOKING_PREFERENCE} from '../../../../constants/ActionTypes';

const initialState = null;

export default function bookingPreferences(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BOOKING_PREFERENCES: {
      const {profile} = action;
      return profile;
    }
    case SAVE_BOOKING_PREFERENCE: {
      const {bookingPreferences} = action;
      return bookingPreferences;
    }
    case CLEAR_BOOKING_PREFERENCES: {
      return initialState;
    }
    case SET_BOOKING_PREFERENCES: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
