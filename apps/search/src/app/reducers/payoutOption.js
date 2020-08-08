import {UPDATE_PAYOUT_OPTION, CLEAR_PAYOUT_OPTION, SET_PAYOUT_OPTION} from '../constants/ActionTypes';

const initialState = '';

export default function businessModel(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PAYOUT_OPTION: {
      const {profile} = action;
      return profile;
    }
    case CLEAR_PAYOUT_OPTION: {
      return initialState;
    }
    case SET_PAYOUT_OPTION: {
      return action.data;
    }
    default:
      return state;
  }
}
