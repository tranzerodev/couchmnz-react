import {UPDATE_BOOKING_PREFERENCES, CLEAR_BOOKING_PREFERENCES, SET_BOOKING_PREFERENCES} from '../constants/ActionTypes';

const initialState = '';

export default function bookingPreferences(state = initialState, action) {
  switch (action.type) {
    case UPDATE_BOOKING_PREFERENCES: {
      const {profile} = action;
      return profile;
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
