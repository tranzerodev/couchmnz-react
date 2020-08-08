import {UPDATE_CANCELLATION_POLICY, CLEAR_CANCELLATION_POLICY, SET_CANCELATION_POLICY, SAVE_BOOKING_PREFERENCE} from '../../../../constants/ActionTypes';

const initialState = null;

export default function bookingPreferences(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CANCELLATION_POLICY: {
      const {profile} = action;
      return profile;
    }
    case SAVE_BOOKING_PREFERENCE: {
      const {cancellationPolicy} = action;
      return cancellationPolicy;
    }
    case CLEAR_CANCELLATION_POLICY: {
      return initialState;
    }
    case SET_CANCELATION_POLICY: {
      const {data} = action;
      return data;
    }
    default:
      return state;
  }
}
