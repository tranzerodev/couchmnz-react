import {UPDATE_CANCELLATION_POLICY, CLEAR_CANCELLATION_POLICY, SET_CANCELATION_POLICY} from '../constants/ActionTypes';

const initialState = '';

export default function bookingPreferences(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CANCELLATION_POLICY: {
      const {profile} = action;
      return profile;
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
